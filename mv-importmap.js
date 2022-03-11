window.importmap.imports.utils = "./utils/index.js";
window.importmap.imports.config = "./config.js";
const im = document.createElement('script');
im.type = 'importmap';
im.textContent = JSON.stringify(importmap);
document.currentScript.after(im);