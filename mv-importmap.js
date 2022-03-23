window.importmap.imports.utils = "./utils/index.js";
window.importmap.imports.config = "./config.js";
window.importmap.imports['router-slot'] = "./node_modules/@meveo-org/mv-dependencies/router-slot/index.js";
window.importmap.imports.ajv = "./node_modules/@meveo-org/mv-dependencies/ajv/ajv.min.js";
const im = document.createElement('script');
im.type = 'importmap';
im.textContent = JSON.stringify(importmap);
document.currentScript.after(im);