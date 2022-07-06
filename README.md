<h1  align="center">@hopin/logger</h1>

<p align="center">
  <img src="https://github.com/gauntface/logger/workflows/Build%20and%20Publish/badge.svg" alt="Build and Publish Status" />
</p>

<p align="center">
`@gauntface/logger` is a simple library aimed at making it easy to add
colored and prefixed logs to a project in both Node and the browser.
</p>

<p align="center">
<img a;t="Screenshot of hopin-logger demos in Node and Browser" src="https://raw.githubusercontent.com/gauntface/hopin-logger/master/hopin-logger-screenshots.png" />
</p>

## Usage in Browser

```html
<script src="https://unpkg.com/@gauntface/logger@3.0.1/build/browser-globals.js"></script>
<script>
  // Use the default logger
  gauntface.logger.debug(`Hello, World!`);

  // Customize the default loggers prefix
  gauntface.logger.setPrefix(`GitHub README Demo`);
  gauntface.logger.log(`*wave*`);

  // Create your own logger instances
  const simpleLogger = new gauntface.Logger();
  simpleLogger.warn(`Logger supports warn()...`);
  simpleLogger.error(`...and error()`);

  // Use your own prefix for some or all of the log
  // levels
  const complexLogger = new gauntface.Logger({
    prefix: {
      [gauntface.LogLevels.GROUP]: 'My App',
      [gauntface.LogLevels.ERROR]: '👻',
    },
  });
  complexLogger.log('The logger lib also supports groups');
  complexLogger.group(`Like this one`);
  complexLogger.log(`I'm nested`);
  complexLogger.groupCollapsed(`You can collapse them too`);
  complexLogger.error(`Boo`);
  complexLogger.groupEnd();
  complexLogger.groupEnd();
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
