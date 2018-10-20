<h1  align="center">@hopin/logger</h1>

<p align="center">
  <a href="https://travis-ci.org/gauntface/hopin-logger"><img src="https://travis-ci.org/gauntface/hopin-logger.svg?branch=master" alt="Travis Build Status" /></a>
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
hopin.logger.setPrefix('Example');

hopin.logger.debug('Doing some debugging?');
hopin.logger.info('I hope to provide info');
hopin.logger.log('I\'m a friendly log.');
hopin.logger.warn('Oops, I\'m an warning.');
hopin.logger.error('Eek! I\'m an error.');

hopin.logger.group('I can group logs together.');
hopin.logger.log('Message in a group....');
hopin.logger.log('....awesome sauce.');
hopin.logger.groupEnd();
</script>
```

For multiple loggers with seperate prefixes:

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
const {logger} = require('@hopin/logger');

logger.setPrefix('Example');

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

For multiple loggers with seperate prefixes:

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