const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'downloaded_assets');
const pubDestDir = path.join(__dirname, 'public', 'assets', 'images');
const srcDestDir = path.join(__dirname, 'src', 'assets', 'images');

[pubDestDir, srcDestDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const files = fs.readdirSync(srcDir);
files.forEach(f => {
  fs.copyFileSync(path.join(srcDir, f), path.join(pubDestDir, f));
  fs.copyFileSync(path.join(srcDir, f), path.join(srcDestDir, f));
});

console.log(`Copied ${files.length} images to public/assets/images and src/assets/images`);

// Create all folders
const dirsToCreate = [
  'src/components',
  'src/pages',
  'src/data',
  'src/hooks',
  'src/context'
];
dirsToCreate.forEach(d => {
  const p = path.join(__dirname, d);
  if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
});
console.log('Project directories created.');
