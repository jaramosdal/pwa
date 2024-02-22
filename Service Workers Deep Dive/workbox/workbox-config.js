module.exports = {
  "skipWaiting": true,
  "clientsClaim": true,
  "directoryIndex" : "index.htm",
  "globDirectory": "public/",
  "globPatterns": [
    "**/*.{js,css,ico,eot,svg,ttf,woff,woff2,otf,jpg,png,htm}"
  ],
  "swDest": "public/workbox-sw.js"  
};