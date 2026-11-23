const fs = require('fs');
const homeHtml = fs.readFileSync('scraped_raw/home.html', 'utf-8');

const sIdx = homeHtml.indexOf('Services I Offer');
if (sIdx !== -1) {
  const slice = homeHtml.slice(sIdx, sIdx + 15000);
  console.log('Snippet from Services I Offer:\n');
  // Strip out large blocks of style/script
  console.log(slice.replace(/<style[\s\S]*?<\/style>/gi, '').slice(0, 3000));
}
