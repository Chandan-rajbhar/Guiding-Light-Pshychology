const fs = require('fs');
const path = require('path');
const https = require('https');

const videoUrl = 'https://guidinglightnow.com/wp-content/uploads/2026/04/Untitled-video-3.mp4';
const pubDir = path.join(__dirname, 'public', 'assets', 'videos');
const srcDir = path.join(__dirname, 'src', 'assets', 'videos');

[pubDir, srcDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

const pubDest = path.join(pubDir, 'Untitled-video-3.mp4');
const srcDest = path.join(srcDir, 'Untitled-video-3.mp4');

console.log('Fetching video metadata and downloading:', videoUrl);

const req = https.get(videoUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
  console.log('Status:', res.statusCode);
  console.log('Content-Length:', res.headers['content-length'], 'bytes');
  console.log('Content-Type:', res.headers['content-type']);

  if (res.statusCode !== 200) {
    console.error('Failed to download video, status:', res.statusCode);
    return;
  }

  const fileStream = fs.createWriteStream(pubDest);
  res.pipe(fileStream);

  fileStream.on('finish', () => {
    fileStream.close(() => {
      console.log('Downloaded to public/assets/videos/Untitled-video-3.mp4');
      fs.copyFileSync(pubDest, srcDest);
      console.log('Copied to src/assets/videos/Untitled-video-3.mp4');
      const stats = fs.statSync(pubDest);
      console.log('File size:', (stats.size / (1024 * 1024)).toFixed(2), 'MB');
    });
  });
});

req.on('error', (err) => {
  console.error('Download error:', err.message);
});
