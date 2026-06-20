const fs = require('fs');
const path = require('path');
const https = require('https');

const BABEL_LOCAL_PATH = path.join(__dirname, 'backend', 'babel.min.js');
const BABEL_CDN_URL = "https://cdn.jsdelivr.net/npm/@babel/standalone@7.22.20/babel.min.js";
const APP_JS_PATH = path.join(__dirname, 'frontend', 'app.js');
const APP_COMPILED_PATH = path.join(__dirname, 'frontend', 'app.compiled.js');

// Function to download Babel if not present locally
function getBabelCode(callback) {
    if (fs.existsSync(BABEL_LOCAL_PATH)) {
        console.log("Loading local Babel Standalone from backend/babel.min.js...");
        callback(fs.readFileSync(BABEL_LOCAL_PATH, 'utf8'));
        return;
    }

    console.log("Local Babel not found. Downloading from CDN...");
    https.get(BABEL_CDN_URL, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
            console.log("Download complete. Saving backend/babel.min.js...");
            fs.writeFileSync(BABEL_LOCAL_PATH, data);
            callback(data);
        });
    }).on('error', (err) => {
        console.error("Error downloading Babel:", err);
        process.exit(1);
    });
}

getBabelCode((babelCode) => {
    // Mock a CommonJS environment for Babel evaluation
    const tempModule = { exports: {} };
    const tempRequire = require;
    
    try {
        const runModule = new Function('module', 'exports', 'require', babelCode);
        runModule(tempModule, tempModule.exports, tempRequire);
    } catch (e) {
        console.error("Failed to parse Babel code:", e);
        process.exit(1);
    }
    
    const Babel = tempModule.exports.Babel || tempModule.exports;
    if (!Babel || typeof Babel.transform !== 'function') {
        console.error("Babel Standalone could not be initialized!");
        process.exit(1);
    }
    
    console.log("Reading frontend/app.js...");
    if (!fs.existsSync(APP_JS_PATH)) {
        console.error("frontend/app.js not found!");
        process.exit(1);
    }
    const appJsCode = fs.readFileSync(APP_JS_PATH, 'utf8');
    
    console.log("Transpiling app.js to app.compiled.js...");
    try {
        const output = Babel.transform(appJsCode, {
            presets: ['react', 'es2015']
        });
        
        fs.writeFileSync(APP_COMPILED_PATH, output.code);
        console.log(`SUCCESS! Compiled file saved to frontend/app.compiled.js (${output.code.length} bytes)`);
    } catch (err) {
        console.error("TRANSPILATION FAILED!");
        console.error(err);
        process.exit(1);
    }
});
