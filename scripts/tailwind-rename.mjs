// Tailwind 4 class rename script - native Node.js
import { readdirSync, readFileSync, writeFileSync, statSync } from 'fs';
import { join } from 'path';

const replacements = [
    { from: /shadow-sm\b/g, to: 'shadow-xs' },
    { from: /text-opacity-(\d+)/g, to: 'text-white/$1' },
    { from: /bg-opacity-(\d+)/g, to: 'bg-white/$1' },
    { from: /\bflex-grow\b/g, to: 'grow' },
    { from: /\bflex-shrink-0\b/g, to: 'shrink-0' },
];

function getAllFiles(dir, exts = ['.tsx', '.ts', '.css']) {
    let results = [];
    const list = readdirSync(dir);

    list.forEach(file => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);

        if (stat.isDirectory()) {
            if (!file.startsWith('.') && file !== 'node_modules') {
                results = results.concat(getAllFiles(filePath, exts));
            }
        } else {
            const hasExt = exts.some(ext => file.endsWith(ext));
            if (hasExt) results.push(filePath);
        }
    });

    return results;
}

const srcDir = 'c:/Users/domin/Desktop/tyrnel_site/src';
const files = getAllFiles(srcDir);

let changeCount = 0;

files.forEach(file => {
    let content = readFileSync(file, 'utf8');
    let changed = false;

    replacements.forEach(({ from, to }) => {
        if (from.test(content)) {
            content = content.replace(from, to);
            changed = true;
        }
    });

    if (changed) {
        writeFileSync(file, content, 'utf8');
        changeCount++;
    }
});

console.log(`✅ Updated ${changeCount} files`);
