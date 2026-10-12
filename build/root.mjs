// Imported first by build-site.mjs: every build module resolves data and asset paths from the repo root.
import { fileURLToPath } from 'node:url';
process.chdir(fileURLToPath(new URL('..', import.meta.url)));
