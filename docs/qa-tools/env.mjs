// Shared tool lookup for the QA scripts, so they run on any machine without edits.
// Playwright: PW_BASE, then a local node_modules, then the global npm root, then the Codex runtime.
// PHP: PHP_EXE, then C:/dev/php/php.exe if present, then `php` on PATH.
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { homedir } from 'node:os';

const globalRoot = () => { try { return execSync('npm root -g', { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };
const bases = [process.env.PW_BASE, import.meta.url, globalRoot(), homedir() + '/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules']
  .filter(Boolean).map(base => base.startsWith('file:') || /[\\/]$/.test(base) ? base : base + '/');

function loadPlaywright() {
  for (const base of bases) { try { return createRequire(base)('playwright'); } catch {} }
  throw new Error('Playwright not found. Install it (npm i -g playwright) or set PW_BASE to the folder containing node_modules/playwright.');
}

// Loaded on first launch, so PHP-only scripts run without Playwright installed.
export const chromium = { launch: (...args) => loadPlaywright().chromium.launch(...args) };
export const PHP = process.env.PHP_EXE || (existsSync('C:/dev/php/php.exe') ? 'C:/dev/php/php.exe' : 'php');
