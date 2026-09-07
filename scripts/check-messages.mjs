import ts from "typescript";
import fs from "node:fs";
import assert from "node:assert/strict";

function readMessages(locale) {
  const filename = new URL(`../messages/${locale}.json`, import.meta.url);
  const text = fs.readFileSync(filename, "utf8");
  const tree = ts.parseJsonText(filename.pathname, text);
  assert.equal(tree.parseDiagnostics.length, 0, `${locale}: invalid JSON`);
  function visit(node) {
    if (ts.isObjectLiteralExpression(node)) {
      const names = new Set();
      for (const property of node.properties) {
        const name = property.name?.text;
        assert.ok(!names.has(name), `${locale}: duplicate key ${name}`);
        names.add(name);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  return JSON.parse(text);
}

function keys(value, prefix = "") {
  return Object.entries(value).flatMap(([key, entry]) => {
    const fullKey = `${prefix}${key}`;
    if (entry && typeof entry === "object") return keys(entry, `${fullKey}.`);
    assert.equal(typeof entry, "string", `${fullKey}: expected a translation string`);
    return [fullKey];
  }).sort();
}

assert.deepEqual(keys(readMessages("es")), keys(readMessages("en")), "ES/EN translation keys differ");
console.log("Translations: valid JSON, no duplicate keys, ES/EN keys match.");
