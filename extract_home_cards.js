const fs = require('fs');
const html = fs.readFileSync('scraped_raw/home.html', 'utf-8');

function clean(s) {
  return (s || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const re = /(icon-1|icon-2|icn-3|icon-4|icon-5|icon-6|icon-7|icon-8|icon-9|icons|icos|dsd)\.png[\s\S]{1,600}?<h2[^>]*class="elementor-heading-title[^"]*"[^>]*>([\s\S]*?)<\/h2>[\s\S]{1,600}?<div[^>]*class="[^"]*elementor-widget-text-editor[^"]*"[^>]*>([\s\S]*?)<\/div>[\s\S]{1,600}?href="([^"]*)"/gi;

let m;
let count = 0;
while ((m = re.exec(html)) !== null) {
  count++;
  console.log(`Card ${count}:`);
  console.log('  Icon:', m[1] + '.png');
  console.log('  Title:', clean(m[2]));
  console.log('  Desc:', clean(m[3]));
  console.log('  Href:', m[4]);
}

if (count === 0) {
  console.log('Regex did not match directly, let us slice sections');
  const sections = html.split(/wp-content\/uploads\/2026\/03\/(icon-1|icon-2|icn-3|icon-4|icon-5|icon-6|icon-7|icon-8|icon-9|icons|icos|dsd)\.png/);
  for (let i = 1; i < sections.length; i += 2) {
    const icon = sections[i] + '.png';
    const body = sections[i + 1].slice(0, 1500);
    const titleMatch = body.match(/<h2[^>]*class="elementor-heading-title[^"]*"[^>]*>([\s\S]*?)<\/h2>/i);
    const descMatch = body.match(/<div[^>]*class="[^"]*elementor-widget-text-editor[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    const hrefMatch = body.match(/href="([^"]*)"/i);
    console.log(`Section ${i}:`);
    console.log('  Icon:', icon);
    console.log('  Title:', clean(titleMatch ? titleMatch[1] : ''));
    console.log('  Desc:', clean(descMatch ? descMatch[1] : ''));
    console.log('  Href:', hrefMatch ? hrefMatch[1] : '');
  }
}
