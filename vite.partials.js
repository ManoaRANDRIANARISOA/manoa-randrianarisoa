import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
// The directive owns its whole line: the partial brings its own indentation.
const INCLUDE = /^[ \t]*<!--\s*@include\s+([\w./-]+\.html)\s*-->[ \t]*$/gm;

function inline(html, origin, depth) {
  if (depth > 8) throw new Error(`html-partials: include depth exceeded from ${origin}`);
  return html.replace(INCLUDE, (_match, rel) => {
    const abs = resolve(ROOT, rel);
    if (!existsSync(abs)) {
      throw new Error(`html-partials: "${rel}" introuvable (inclus depuis ${origin})`);
    }
    // Drop the file's final newline: the directive line supplies its own terminator.
    return inline(readFileSync(abs, 'utf8'), abs, depth + 1).replace(/\n$/, '');
  });
}

// index.html is a composition root: every planche lives in src/partials/*.html and
// is inlined here, before Vite scans the document for assets to process.
export function htmlPartials() {
  return {
    name: 'html-partials',
    enforce: 'pre',
    transformIndexHtml(html) {
      return inline(html, 'index.html', 0);
    }
  };
}
