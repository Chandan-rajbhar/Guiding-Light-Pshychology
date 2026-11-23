const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { URL } = require('url');

const baseUrl = 'https://guidinglightnow.com';

const pagesToScrape = [
  '/',
  '/meet-dr-anna/',
  '/adhd-testing/',
  '/mental-health-links/',
  '/faqs/',
  '/get-in-touch/',
  '/individual-therapy-for-adults/',
  '/therapy-for-teenagers-adolescents/',
  '/adhd-therapy-executive-functioning-coaching/',
  '/anxiety-stress/',
  '/trauma-informed-therapy/',
  '/sleep-insomnia-support/',
  '/relationship-interpersonal-therapy/',
  '/mindfulness-based-therapy/',
  '/burnout-life-transitions/',
  '/self-esteem-difficulties/',
  '/anger-management/',
  '/parent-support/'
];

function fetchUrl(targetUrl) {
  return new Promise((resolve, reject) => {
    const client = targetUrl.startsWith('https') ? https : http;
    const req = client.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirect = res.headers.location;
        if (!redirect.startsWith('http')) {
          redirect = new URL(redirect, targetUrl).toString();
        }
        return fetchUrl(redirect).then(resolve).catch(reject);
      }
      if (res.statusCode >= 400) {
        return resolve({ status: res.statusCode, data: '', url: targetUrl });
      }
      let chunks = [];
      res.on('data', chunk => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve({ status: res.statusCode, data: buffer.toString('utf-8'), buffer, url: targetUrl });
      });
    });
    req.on('error', reject);
    req.setTimeout(20000, () => {
      req.destroy();
      reject(new Error('Timeout ' + targetUrl));
    });
  });
}

function downloadBinary(targetUrl, destPath) {
  return new Promise((resolve, reject) => {
    const client = targetUrl.startsWith('https') ? https : http;
    const req = client.get(targetUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirect = res.headers.location;
        if (!redirect.startsWith('http')) redirect = new URL(redirect, targetUrl).toString();
        return downloadBinary(redirect, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Status ' + res.statusCode));
      }
      const file = fs.createWriteStream(destPath);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    });
    req.on('error', reject);
  });
}

async function run() {
  const assetsDir = path.join(__dirname, 'scraped_raw');
  const imgDir = path.join(__dirname, 'scraped_images');
  if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });
  if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });

  const pageData = {};
  const allImages = new Set();
  const allCssUrls = new Set();

  console.log('Starting scrape of ' + pagesToScrape.length + ' pages...');

  for (const pagePath of pagesToScrape) {
    const fullUrl = baseUrl + pagePath;
    console.log('Fetching ' + fullUrl);
    try {
      const res = await fetchUrl(fullUrl);
      const html = res.data;
      const cleanName = pagePath === '/' ? 'home' : pagePath.replace(/\//g, '_').replace(/^_|_$/g, '');
      fs.writeFileSync(path.join(assetsDir, cleanName + '.html'), html);
      pageData[pagePath] = { status: res.status, length: html.length, title: '' };

      const titleMatch = html.match(/<title>(.*?)<\/title>/i);
      if (titleMatch) pageData[pagePath].title = titleMatch[1];

      // Extract stylesheets
      const cssMatches = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']([^"']+)["']/gi)];
      for (const m of cssMatches) allCssUrls.add(m[1]);

      // Extract images
      const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
      for (const m of imgMatches) {
        let src = m[1];
        if (src.startsWith('//')) src = 'https:' + src;
        else if (src.startsWith('/')) src = baseUrl + src;
        if (src.startsWith('http')) allImages.add(src);
      }

      // Background images
      const bgMatches = [...html.matchAll(/url\(["']?([^"')]+)["']?\)/gi)];
      for (const m of bgMatches) {
        let src = m[1];
        if (src.startsWith('//')) src = 'https:' + src;
        else if (src.startsWith('/')) src = baseUrl + src;
        if (src.startsWith('http') && (src.match(/\.(jpg|jpeg|png|webp|svg|gif)(\?|$)/i))) {
          allImages.add(src);
        }
      }
    } catch (err) {
      console.error('Failed page ' + fullUrl + ':', err.message);
    }
  }

  console.log('\nFound ' + allCssUrls.size + ' CSS links and ' + allImages.size + ' images.');
  fs.writeFileSync('all_images.json', JSON.stringify([...allImages], null, 2));
  fs.writeFileSync('all_css.json', JSON.stringify([...allCssUrls], null, 2));
  fs.writeFileSync('page_status.json', JSON.stringify(pageData, null, 2));

  // Inspect CSS for colors and fonts
  console.log('\nDownloading main CSS to inspect fonts & colors...');
  let cssText = '';
  for (const cssUrl of allCssUrls) {
    if (cssUrl.includes('guidinglightnow.com') || cssUrl.includes('wp-content') || cssUrl.includes('fonts.googleapis.com')) {
      try {
        console.log('Fetching CSS:', cssUrl);
        const cssRes = await fetchUrl(cssUrl.startsWith('//') ? 'https:' + cssUrl : cssUrl);
        cssText += '\n/* ' + cssUrl + ' */\n' + cssRes.data;
      } catch (e) {
        console.log('Failed to fetch CSS ' + cssUrl + ':', e.message);
      }
    }
  }
  fs.writeFileSync('aggregated.css', cssText);

  // Extract color codes
  const hexColors = [...new Set(cssText.match(/#[0-9a-fA-F]{3,8}\b/g) || [])];
  const rgbColors = [...new Set(cssText.match(/rgba?\([^)]+\)/g) || [])];
  const fonts = [...new Set(cssText.match(/font-family:[^;]+/g) || [])];

  fs.writeFileSync('design_tokens.json', JSON.stringify({
    hexColors,
    rgbColors: rgbColors.slice(0, 50),
    fonts: fonts.slice(0, 30)
  }, null, 2));

  console.log('Scrape phase 1 complete!');
}

run().catch(console.error);
