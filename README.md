# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

----------------

To solve the issue with the wasm file, We had to add the following line to the fhe-browser.js file:

Change this line to:

```javascript
import wasm from "./tfhe_bg.wasm";
```

This line:

```javascript
import wasm from "./tfhe_bg-browser.wasm?url";
```

As of writing this it is on line 10, it may change in the future.