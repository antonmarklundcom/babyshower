// Thin CLI wrapper; the checks live in verify/suite.mjs and also run under node:test (npm run verify:final).
// Usage unchanged: node verify.mjs --phase B1..B5 | --final [--calc] [--http <origin>] [--zip <file>]
globalThis.VERIFY_ARGS = process.argv.slice(2);
const { phase, failures, notes } = await import('./verify/suite.mjs');
for (const note of notes) console.log(note);
if (failures.length) { failures.forEach(f => console.error('FAIL: ' + f)); process.exitCode = 1; }
else console.log(`PASS: applicable ${phase} checks, including executed consent/menu/form/analytics behavior.`);
