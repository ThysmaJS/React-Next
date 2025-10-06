import '@testing-library/jest-dom';

// Polyfills pour l'environnement de test Node.js
const { TextEncoder, TextDecoder } = require('util');

Object.assign(global, { TextEncoder, TextDecoder });