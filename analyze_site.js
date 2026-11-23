const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// 1. Check colors in aggregated.css
const aggregated = fs.readFileSync('aggregated.css', 'utf-8');
const colorMatches = aggregated.match(/(background-color|color|border-color|fill)\s*:\s*([^;!}]+)/gi) || [];
const counts = {};
colorMatches.forEach(c => {
  const clean = c.replace(/\s+/g, ' ').trim().toLowerCase();
  counts[clean] = (counts[clean] || 0) + 1;
});
const sortedColors = Object.entries(counts).sort((a,b) => b[1] - a[1]);

// 2. Scan scraped_raw html files
const htmlFiles = fs.readdirSync('scraped_raw');
const linksFound = new Set();
const almaLinks = new Set();
const phoneMatches = new Set();
const emailMatches = new Set();

htmlFiles.forEach(f => {
  const content = fs.readFileSync(path.join('scraped_raw', f), 'utf-8');
  const almas = content.match(/https?:\/\/[^\s"'<>]*helloalma[^\s"'<>]*/gi) || [];
  almas.forEach(a => almaLinks.add(a));

  const phones = content.match(/(?:\+?1[-.\s]?)?\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}/g) || [];
  phones.forEach(p => phoneMatches.add(p));

  const emails = content.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g) || [];
  emails.forEach(e => emailMatches.add(e));
});

console.log('Alma Links:', [...almaLinks]);
console.log('Phone numbers:', [...phoneMatches]);
console.log('Email addresses:', [...emailMatches]);

// 3. Inspect color rules specifically in post-9.css / post-6.css
console.log('\nTop 25 color declarations:');
sortedColors.slice(0, 25).forEach(([rule, cnt]) => console.log(`${cnt}: ${rule}`));

// 4. Download all images into downloaded_assets/
const images = JSON.parse(fs.readFileSync('all_images.json', 'utf-8'));
const assetsDir = path.join(__dirname, 'downloaded_assets');
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirect = res.headers.location;
        if (!redirect.startsWith('http')) redirect = new URL(redirect, url).toString();
        return downloadFile(redirect, dest).then(resolve);
      }
      if (res.statusCode !== 200) {
        console.log(`Failed ${url}: status ${res.statusCode}`);
        return resolve(false);
      }
      const stream = fs.createWriteStream(dest);
      res.pipe(stream);
      stream.on('finish', () => {
        stream.close();
        resolve(true);
      });
      stream.on('error', () => resolve(false));
    });
    req.on('error', (err) => {
      console.log(`Error downloading ${url}:`, err.message);
      resolve(false);
    });
    req.setTimeout(15000, () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function downloadAll() {
  console.log(`Downloading ${images.length} images...`);
  const imageMap = {};
  for (const imgUrl of images) {
    const parsed = new URL(imgUrl);
    const basename = path.basename(parsed.pathname);
    const dest = path.join(assetsDir, basename);
    if (!fs.existsSync(dest)) {
      await downloadFile(imgUrl, dest);
    }
    imageMap[imgUrl] = basename;
  }
  fs.writeFileSync('image_map.json', JSON.stringify(imageMap, null, 2));
  console.log('Images download finished!');
}

downloadAll();
