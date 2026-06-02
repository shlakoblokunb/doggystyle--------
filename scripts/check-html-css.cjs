const fs = require('node:fs');
const required = ['index.html', 'about.html', 'care.html', 'gallery.html', 'facts.html', 'contacts.html', 'src/main.jsx', 'css/1.css'];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Missing required file: ${file}`);
}

for (const file of required.filter((name) => name.endsWith('.html'))) {
  const html = fs.readFileSync(file, 'utf8');

  if (!html.includes('<meta name="keywords" content="')) {
    throw new Error(`Missing keywords meta tag: ${file}`);
  }
}
const css = fs.readFileSync('css/1.css', 'utf8');
let depth = 0;
let selector = '';
const seen = new Set();
const duplicates = [];
for (const char of css) {
  if (char === '{') {
    const value = selector.trim();
    if (depth === 0 && value && !value.startsWith('@') && !value.includes(',')) {
      if (seen.has(value)) duplicates.push(value);
      seen.add(value);
    }
    selector = '';
    depth += 1;
  } else if (char === '}') {
    depth = Math.max(0, depth - 1);
    selector = '';
  } else if (depth === 0) {
    selector += char;
  }
}
if (duplicates.length) throw new Error(`Duplicate top-level selectors: ${duplicates.join(', ')}`);
