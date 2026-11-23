const fs = require('fs');
const html = fs.readFileSync('scraped_raw/home.html', 'utf-8');

// Search for video tags, mp4, webm, youtube, vimeo, elementor-background-video, etc.
const videoMatches = html.match(/<video[\s\S]*?<\/video>/gi) || [];
console.log('Video tags found:', videoMatches.length);
videoMatches.forEach(v => console.log('VIDEO:', v));

const mp4Matches = html.match(/https?:\/\/[^\s"'<>]+\.(?:mp4|webm|mov|m4v)[^\s"'<>]*/gi) || [];
console.log('Video file matches:', mp4Matches);

const ytMatches = html.match(/https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)[^\s"'<>]*/gi) || [];
console.log('YouTube matches:', ytMatches);

const vimeoMatches = html.match(/https?:\/\/(?:player\.)?vimeo\.com[^\s"'<>]*/gi) || [];
console.log('Vimeo matches:', vimeoMatches);

// Search around "Start Feeling More in Control"
const pos = html.indexOf('Start Feeling More in Control');
if (pos !== -1) {
  const container = html.slice(Math.max(0, pos - 3000), pos + 1000);
  console.log('\n--- HERO CONTAINER SNIPPET ---');
  // Look for any url, video, iframe, data-settings
  const urls = container.match(/(?:src|href|url|data-[a-z0-9-]+)="([^"]+)"/gi) || [];
  urls.forEach(u => console.log('CONTAINER ATTR:', u));
  // Look for data-settings
  const ds = container.match(/data-settings='([^']+)'/gi) || container.match(/data-settings="([^"]+)"/gi) || [];
  ds.forEach(d => console.log('DATA-SETTINGS:', d));
}
