<h1  align="center">@hopin/logger</h1>

<p align="center">
  <img src="https://github.com/gauntface/hopin-logger/workflows/Build%20and%20Publish/badge.svg" alt="Build and Publish Status" />
  <a href="https://coveralls.io/github/gauntface/hopin-logger?branch=master"><img src="https://img.shields.io/coveralls/github/gauntface/hopin-logger.svg" alt="Coverage Status" /></a>
  <a href="https://david-dm.org/gauntface/hopin-logger" title="dependencies status"><img src="https://david-dm.org/gauntface/hopin-logger/status.svg"/></a>
  <a href="https://david-dm.org/gauntface/hopin-logger?type=dev" title="devDependencies status"><img src="https://david-dm.org/gauntface/hopin-logger/dev-status.svg"/></a>
  <a href="https://david-dm.org/gauntface/hopin-logger?type=peer" title="peerDependencies status"><img src="https://david-dm.org/gauntface/hopin-logger/peer-status.svg"/></a>
</p>

<p align="center">
`hopin-logger` is a simply and small library aimed at making it easy to add
colored and prefixed logs to a project in both Node 8+ and the browser.
</p>

<p align="center">
<img a;t="Screenshot of hopin-logger demos in Node and Browser" src="https://raw.githubusercontent.com/gauntface/hopin-logger/master/hopin-logger-screenshots.png" />
</p>

<p align="center">
<img alt="Jake Rainbow" src="https://media.giphy.com/media/QrV1C9kNmsacg/giphy.gif" />
</p>

## Usage in Browser
 
```html
<script src="https://unpkg.com/@hopin/logger@0.0.5/dist/iife/browser/browser.js"></script>
<script>
const example1Logger = new hopin.logger.Logger({
  prefix: 'Example 1',
});
const example2Logger = new hopin.logger.Logger({
  prefix: 'Example 2',
});

example1Logger.debug('Hello Logger 2 *waves*');
example2Logger.log('Oh Hai!');
</script>
```

## Usage in Node

```javascript
const {Logger} = require('@hopin/logger');

const example1Logger = new Logger({
  prefix: 'Example 1',
});
const example2Logger = new Logger({
  prefix: 'Example 2',
});

example1Logger.debug('Hello Logger 2 *waves*');
example2Logger.log('Oh Hai!');
```
