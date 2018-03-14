<h1  align="center">hopin-logger</h1>

<p align="center">
  <a href="https://travis-ci.org/gauntface/hopin-logger"><img src="https://travis-ci.org/gauntface/hopin-logger.svg?branch=master" alt="Travis Build Status" /></a>
  <a href="https://coveralls.io/github/gauntface/hopin-logger?branch=master"><img src="https://coveralls.io/repos/github/gauntface/hopin-logger/badge.svg?branch=master" alt="Coverage Status" /></a>
  <a href="https://david-dm.org/gauntface/hopin-logger" title="dependencies status"><img src="https://david-dm.org/gauntface/hopin-logger/status.svg"/></a>
  <a href="https://david-dm.org/gauntface/hopin-logger?type=dev" title="devDependencies status"><img src="https://david-dm.org/gauntface/hopin-logger/dev-status.svg"/></a>
  <a href="https://david-dm.org/gauntface/hopin-logger?type=peer" title="peerDependencies status"><img src="https://david-dm.org/gauntface/hopin-logger/peer-status.svg"/></a>
</p>

<p align="center">
`hopin-logger` is a simply and small library aimed at making it easy to add
colored and prefixed logs to a project in both Node 8+ and the browser.
</p>

<p align="center">
<img a;t="Screenshot of hopin-logger demos in Node and Browser" src="https://raw.githubusercontent.com/gauntface/hopin-logger/master/demo/hopin-logger-screenshots.png" />
</p>

<p align="center">
<img alt="Jake Rainbow" src="https://media.giphy.com/media/QrV1C9kNmsacg/giphy.gif" />
</p>

## Usage in Browser

```html
<script src="https://unpkg.com/hopin-logger@0.0.1/dist/iife/browser/index.js"></script>
<script>
const factory = hopin.logger.factory
const logger = factory.getLogger('example-project', {
  prefix: 'Example',
});

logger.debug('Doing some debugging?');
logger.info('I hope to provide info');
logger.log('I\'m a friendly log.');
logger.warn('Oops, I\'m an warning.');
logger.error('Eek! I\'m an error.');

logger.group('I can group logs together.');
logger.log('Message in a group....');
logger.log('....awesome sauce.');
logger.groupEnd();
</script>
```

## Usage in Node

```javascript
const {factory} = require('hopin-logger');

const logger = factory.getLogger('example-project', {
  prefix: 'Example',
});

logger.debug('Doing some debugging?');
logger.info('I hope to provide info');
logger.log('I\'m a friendly log.');
logger.warn('Oops, I\'m an warning.');
logger.error('Eek! I\'m an error.');

logger.group('I can group logs together.');
logger.log('Message in a group....');
logger.log('....awesome sauce.');
logger.groupEnd();
```
