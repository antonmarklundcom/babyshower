import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { brotliCompressSync } from 'node:zlib';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const read = path => readFileSync(path, 'utf8');
const verifier = read('verify.mjs');
// Use the verifier's HTML parser and simple-selector matcher unchanged.
const { parse, walk, matches } = vm.runInNewContext(verifier.slice(verifier.indexOf('const decode ='), verifier.indexOf('const pages =')) + '\n({parse,walk,matches})', { check: assert });
const files = [...JSON.parse(read('docs/routes.json')).filter(r => r.built).map(r => r.output), '404.html', 'gracias.html'];
assert.equal(files.length, 34);
const nodes = files.flatMap(file => walk(parse(read(file)))).filter(n => n.tag && !n.tag.startsWith('#'));
const js = readdirSync('assets/js').filter(f => f.endsWith('.js')).map(f => read('assets/js/' + f)).join('\n');
const uncertain = new Set(), removed = [];
// Split CSS only outside quotes, brackets and functions (data URLs remain intact).
function split(source, delimiters) {
 let quote = '', depth = 0, start = 0, result = [];
 for (let i = 0; i < source.length; i++) {
  const c = source[i];
  if (quote) { if (c === '\\') i++; else if (c === quote) quote = ''; continue; }
  if (c === '"' || c === "'") { quote = c; continue; }
  if ('(['.includes(c)) depth++;
  if (')]'.includes(c)) depth--;
  if (!depth && delimiters.includes(c)) { result.push(source.slice(start, i)); start = i + 1; }
 }
 result.push(source.slice(start)); return result;
}
function live(selector) {
 // This conditional footer control is emitted when analytics is configured.
 if (selector === '.text-button') { uncertain.add(selector); return true; }
 // JavaScript may create elements, classes or attributes, even absent from static HTML.
 const names = [...selector.matchAll(/\.([\w-]+)|\[([\w-]+)/g)].map(m => m[1] || m[2]);
 if (names.some(name => js.includes(name))) return true;
 // The verifier does not implement functional/structural pseudo-classes: retain them.
 if (/:(?!:?(?:before|after|marker|hover|focus-visible|focus)\b)/.test(selector)) { uncertain.add(selector); return true; }
 const plain = selector.replace(/::?(before|after|marker|hover|focus-visible|focus)\b/g, '').trim() || '*';
 // Extend simple matching with ancestor/child/sibling traversal, without modifying the helper.
 const parts = plain.replace(/\s*([>+~])\s*/g, '$1').match(/(?:\[[^\]]*\]|[^\s>+~])+|[>+~]|\s+/g) || [];
 function match(node, index) {
  if (!node || !matches(node, parts[index])) return false;
  if (index === 0) return true;
  const relation = parts[index - 1], previous = index - 2;
  if (relation === '>') return match(node.parent, previous);
  if (relation === '+' || relation === '~') {
   const siblings = node.parent?.children.filter(n => n.tag) || [], at = siblings.indexOf(node);
   return relation === '+' ? match(siblings[at - 1], previous) : siblings.slice(0, at).some(n => match(n, previous));
  }
  for (let parent = node.parent; parent; parent = parent.parent) if (match(parent, previous)) return true;
  return false;
 }
 return nodes.some(node => match(node, parts.length - 1));
}
function parseCss(source) {
 const rules = []; let start = 0, quote = '', depth = 0, open;
 for (let i = 0; i < source.length; i++) {
  const c = source[i];
  if (quote) { if (c === '\\') i++; else if (c === quote) quote = ''; continue; }
  if (c === '"' || c === "'") { quote = c; continue; }
  if (c === '{') { if (depth++ === 0) open = i; }
  if (c === '}' && --depth === 0) {
   const selector = source.slice(start, open).trim(), body = source.slice(open + 1, i).trim();
   rules.push(selector.startsWith('@media') ? { selector, children: parseCss(body) } : { selector, body });
   start = i + 1;
  }
 }
 assert.equal(depth, 0); assert.equal(source.slice(start).trim(), ''); return rules;
}
let grouped = 0;
function trim(rules) {
 const result = [];
 for (const rule of rules) {
  if (rule.children) { rule.children = trim(rule.children); result.push(rule); continue; }
  const selectors = split(rule.selector, ',').map(s => s.trim());
  if (!selectors.map(live).some(Boolean)) { removed.push(rule.selector); continue; }
  rule.body = split(rule.body, ';').map(d => d.trim()).filter(Boolean).join(';');
  const previous = result.at(-1);
  // Adjacent identical bodies can be grouped without changing cascade order.
  if (previous && !previous.children && previous.body === rule.body) { previous.selector += ',' + rule.selector; grouped++; }
  else result.push(rule);
 }
 return result;
}
const render = rules => rules.map(r => r.children ? r.selector + '{\n' + render(r.children) + '\n}' : r.selector + '{' + r.body + '}').join('\n');
const original = read('assets/css/site.css');
// Preserve one short header for each existing Batch block (and the imagery block).
const blocks = original.split(/\/\*\s*(Batch [456]|B7)(?::[^]*?)?\s*\*\//);
let output = '';
for (let i = 0; i < blocks.length; i += 2) {
 if (i) output += '/* ' + blocks[i - 1] + ' */\n';
 output += render(trim(parseCss(blocks[i].replace(/\/\*[^]*?\*\//g, '')))) + '\n';
}
const before = brotliCompressSync(Buffer.from(original)).length, after = brotliCompressSync(Buffer.from(output)).length;
console.log(JSON.stringify({ pages: files.length, before, after, removedRules: removed.length, groupedRules: grouped, removed, uncertainRetained: uncertain.size }, null, 2));
if (process.argv.includes('--write')) writeFileSync('assets/css/site.css', output);
