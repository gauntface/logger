<h1  align="center">@gauntface/logger</h1>

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
<script src="https://unpkg.com/@gauntface/logger@3.0.2/build/browser-globals.js"></script>
<script>
  console.log('\n\nThe following are the logs out of the box:\n\n\n');

  // Use the default logger
  gauntface.logger.debug(`console.debug()`);
  gauntface.logger.info(`console.info()`);
  gauntface.logger.log(`console.log()`);
  gauntface.logger.warn(`console.warn()`);
  gauntface.logger.error(`console.error()`);

  console.log('\n\nYou can customize the prefix to something you\'ll recognize:\n\n\n');

  // Customize the default loggers prefix
  gauntface.logger.setPrefix(`Logger Demo`);
  gauntface.logger.log('👋');

  // Create your own logger instances
  console.log('\n\nYou can create different instances of "Loggers":\n\n\n');

  const simpleLogger = new gauntface.Logger({
    prefix: 'My App/Demo',
  });
  simpleLogger.log(`Example message`, {
    message: 'Works just like console.log()'
  });

  console.log('\n\nYou can also customize each log level prefix:\n\n\n')

  // Use your own prefix for some or all of the log
  // levels
  const complexLogger = new gauntface.Logger({
    prefix: {
      [gauntface.LogLevels.GROUP]: 'My App/Groups',
      [gauntface.LogLevels.ERROR]: '👻',
    },
  });
  complexLogger.log('The logger lib supports groups');
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
const {Logger} = require('@gauntface/logger');

const example1Logger = new Logger({
  prefix: 'Example 1',
});
const example2Logger = new Logger({
  prefix: 'Example 2',
});

example1Logger.debug('Hello Logger 2 *waves*');
example2Logger.log('Oh Hai!');
```
