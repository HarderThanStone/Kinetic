import fs from "node:fs";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const sourceRoot = path.join(projectRoot, "src");
const sourceExtensions = [".ts", ".tsx", ".js", ".jsx", ".json"];
const files = [];

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (/\.(?:ts|tsx|js|jsx)$/.test(entry.name)) files.push(fullPath);
  }
}

function resolveLocalImport(importer, specifier) {
  const base = specifier.startsWith("@/")
    ? path.join(sourceRoot, specifier.slice(2))
    : path.resolve(path.dirname(importer), specifier);
  const candidates = [base, ...sourceExtensions.map((ext) => `${base}${ext}`)];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  for (const ext of sourceExtensions) {
    const indexFile = path.join(base, `index${ext}`);
    if (fs.existsSync(indexFile)) return indexFile;
  }
  return null;
}

walk(sourceRoot);
const errors = [];
const importPattern = /(?:require\(\s*|from\s+["']|import\s+["'])([.@][^"']+|@\/[^"']+)["']/g;

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  for (const match of content.matchAll(importPattern)) {
    const specifier = match[1];
    if (!resolveLocalImport(file, specifier)) {
      errors.push(`${path.relative(projectRoot, file)} -> ${specifier}`);
    }
  }
}

if (errors.length > 0) {
  console.error("Imports locais ausentes encontrados:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`OK: ${files.length} arquivos verificados; nenhum import local ausente.`);
