$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem
$siteRoot = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
Push-Location $siteRoot
try {
    & node build-site.mjs
    if ($LASTEXITCODE -ne 0) { throw 'Site generation failed' }
    $manifest = Get-Content -LiteralPath 'docs/routes.json' -Raw | ConvertFrom-Json
    if ($null -ne $manifest.PSObject.Properties['routes']) {
        $routes = @($manifest.routes)
    } else {
        $routes = @($manifest)
    }
    if ($routes.Count -ne 34) { throw "Expected 34 manifest routes for this release; found $($routes.Count)" }
    if (@($routes | Where-Object { -not $_.built }).Count) { throw 'Manifest has unbuilt routes' }
    $ship = [System.Collections.Generic.HashSet[string]]::new([System.StringComparer]::Ordinal)
    foreach ($fixed in @('index.html','404.html','gracias.html','lead-forward.php','.htaccess','robots.txt','sitemap.xml')) { [void]$ship.Add($fixed) }
    foreach ($route in $routes) { [void]$ship.Add([string]$route.output) }
    foreach ($asset in Get-ChildItem -LiteralPath 'assets' -File -Recurse -Force) {
        [void]$ship.Add($asset.FullName.Substring($siteRoot.Length + 1).Replace('\','/'))
    }
    foreach ($entry in $ship) {
        if ($entry -match '(^|/)(plan|docs|deploy|codex-input|dist|logs?)(/|$)|(^|/)vendercrm-config|\.mjs$|\.log$|(^|/)\.env' -or $entry -match '(^|/)\.\.(/|$)' -or [System.IO.Path]::IsPathRooted($entry)) { throw "Forbidden shipping entry: $entry" }
        $source = [System.IO.Path]::GetFullPath((Join-Path $siteRoot $entry))
        if (-not $source.StartsWith($siteRoot + [System.IO.Path]::DirectorySeparatorChar, [System.StringComparison]::OrdinalIgnoreCase)) { throw 'Shipping path escapes repository' }
        if (-not (Test-Path -LiteralPath $source -PathType Leaf)) { throw "Missing shipping file: $entry" }
        if ((Get-Item -LiteralPath $source -Force).Attributes -band [System.IO.FileAttributes]::ReparsePoint) { throw "Shipping symlink forbidden: $entry" }
    }
    [void][System.IO.Directory]::CreateDirectory((Join-Path $siteRoot 'dist'))
    $zipPath = Join-Path $siteRoot ('dist/babyshower-' + (Get-Date -Format 'yyyy-MM-dd') + '.zip')
    if (Test-Path -LiteralPath $zipPath) { Remove-Item -LiteralPath $zipPath }
    $zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
    try {
        foreach ($entry in ($ship | Sort-Object)) {
            [void][System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, (Join-Path $siteRoot $entry), $entry, [System.IO.Compression.CompressionLevel]::Optimal)
        }
    } finally { $zip.Dispose() }
    $check = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
    try {
        $entries = @($check.Entries | ForEach-Object { $_.FullName })
        foreach ($route in $routes) { if ($entries -cnotcontains $route.output) { throw "ZIP missing manifest route: $($route.output)" } }
        foreach ($entry in $ship) { if ($entries -cnotcontains $entry) { throw "ZIP missing shipping file: $entry" } }
        if ($entries.Count -ne $ship.Count) { throw 'ZIP entry count mismatch' }
        Write-Output "PASS: $zipPath; $($entries.Count) entries; $($routes.Count) manifest routes."
    } finally { $check.Dispose() }
} finally { Pop-Location }
