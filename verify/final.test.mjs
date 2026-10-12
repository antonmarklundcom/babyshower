// Final gate under node:test: `node --test verify/*.test.mjs` (npm run verify:final). Same checks as
// `node verify.mjs --final`. They run once, in order, while the suite loads (later checks share state); each named
// check is then reported as its own test, so --test-name-pattern filters the report, not the work.
import { test } from 'node:test';
globalThis.VERIFY_ARGS = ['--final'];
const { results, standalone, notes } = await import('./suite.mjs');
for (const { name, ms, error } of results) test(name, t => { t.diagnostic(`ran in ${ms.toFixed(1)} ms`); if (error) throw error; });
test('Standalone checks', () => { if (standalone.length) throw new Error(standalone.join('\n')); });
test('Notes', t => { for (const note of notes) t.diagnostic(note); });
