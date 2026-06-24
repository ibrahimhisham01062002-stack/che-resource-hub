const fs = require('fs');
const path = require('path');

// Mock browser globals
global.React = {
  useState: (val) => [val, (newVal) => {}],
  useEffect: () => {},
  useRef: () => ({ current: null }),
  useMemo: (fn) => fn(),
  createElement: () => ({})
};
global.ReactDOM = {
  createRoot: () => ({
    render: () => {}
  })
};
global.document = {
  getElementById: () => ({})
};
global.window = {
  location: { hostname: 'localhost' },
  MathJax: {}
};
global.localStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {}
};

console.log("Mock environment loaded. Loading app.compiled.js...");
try {
  const filePath = path.join(__dirname, '..', 'frontend', 'app.compiled.js');
  const code = fs.readFileSync(filePath, 'utf8');
  eval(code);
  console.log("SUCCESS: app.compiled.js loaded and evaluated with no runtime errors!");
} catch (err) {
  console.error("FAILURE: Runtime error detected during evaluation!");
  console.error(err);
  process.exit(1);
}
