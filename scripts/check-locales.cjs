#!/usr/bin/env node
const fs = require('fs').promises;
const path = require('path');

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'src');

async function findLocalesDirs(dir) {
  const results = [];
  async function walk(d) {
    let entries;
    try {
      entries = await fs.readdir(d, { withFileTypes: true });
    } catch (e) {
      return;
    }
    for (const ent of entries) {
      const p = path.join(d, ent.name);
      if (ent.isDirectory()) {
        if (ent.name === 'locales') results.push(p);
        await walk(p);
      }
    }
  }
  await walk(dir);
  return results;
}

function flattenKeys(obj, prefix = '') {
  const keys = [];
  for (const k of Object.keys(obj || {})) {
    const val = obj[k];
    const key = prefix ? `${prefix}.${k}` : k;
    if (val && typeof val === 'object' && !Array.isArray(val)) {
      keys.push(...flattenKeys(val, key));
    } else {
      keys.push(key);
    }
  }
  return keys;
}

async function readJson(file) {
  const txt = await fs.readFile(file, 'utf8');
  return JSON.parse(txt);
}

async function checkDir(dir) {
  const files = await fs.readdir(dir);
  const jsonFiles = files.filter(f => f.endsWith('.json'));
  if (jsonFiles.length === 0) return { ok: true };

  const map = {};
  for (const jf of jsonFiles) {
    try {
      map[jf] = await readJson(path.join(dir, jf));
    } catch (err) {
      return { ok: false, error: `Failed to parse ${path.join(dir, jf)}: ${err.message}` };
    }
  }

  if (!map['en.json']) return { ok: true }; // no canonical english file — skip

  const enKeys = new Set(flattenKeys(map['en.json']));
  const problems = [];

  for (const [fname, content] of Object.entries(map)) {
    if (fname === 'en.json') continue;
    const otherKeys = new Set(flattenKeys(content));
    const missing = [...enKeys].filter(k => !otherKeys.has(k));
    if (missing.length) {
      problems.push({ file: path.join(dir, fname), missing });
    }
  }

  return { ok: problems.length === 0, problems };
}

async function main() {
  const dirs = await findLocalesDirs(SRC);
  if (!dirs.length) {
    console.log('No locales directories found under src/.');
    return process.exit(0);
  }

  let hasError = false;
  for (const d of dirs) {
    // check each 'locales' dir
    const res = await checkDir(d);
    if (!res.ok) {
      hasError = true;
      if (res.error) {
        console.error(res.error);
      }
      if (res.problems) {
        for (const p of res.problems) {
          console.error(`\nMissing keys in ${p.file}:`);
          for (const k of p.missing) console.error(`  - ${k}`);
        }
      }
    }
  }

  if (hasError) {
    console.error('\nLocale parity check failed.');
    process.exit(1);
  }

  console.log('Locale parity check passed.');
  process.exit(0);
}

main().catch(err => {
  console.error('Unexpected error running locales check:', err);
  process.exit(2);
});
