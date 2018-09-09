const path = require('path');
const {test} = require('ava');
const fs = require('fs-extra');

// Note this is from build/test/...
const rootDir = path.join(__dirname, '..', '..');

function getPackage() {
  return fs.readJson(path.join(rootDir, 'package.json'));
}

test.serial('should be able to require Logger from package.json', async (t) => {
  const pkg = await getPackage();
  const nodePath = path.join(rootDir, pkg.main);
  await fs.access(nodePath);
  const {Logger} = require(nodePath);
  t.truthy(Logger);

  const instance = new Logger({prefix: 'hopin-logger-test'});
  t.truthy(instance);

  instance.debug('hello, debug');
  instance.info('hello, info');
  instance.log('hello, log');
  instance.warn('hello, warn');
  instance.error('hello, error');

  instance.group('hello, group 1');
  instance.log('hello, log group 1');
  instance.group('hello, group 2');
  instance.log('hello, log group 2');
  instance.groupEnd();
  instance.groupEnd();

  instance.groupCollapsed('hello, groupCollapsed 1');
  instance.log('hello, log group 1');
  instance.groupCollapsed('hello, groupCollapsed 2');
  instance.log('hello, log group 2');
  instance.groupEnd();
  instance.groupEnd();
});

test.serial('should be able to require logger from package.json', async (t) => {
  const pkg = await getPackage();
  const nodePath = path.join(rootDir, pkg.main);
  await fs.access(nodePath);
  const {logger} = require(nodePath);
  t.truthy(logger);

  logger.setPrefix('hopin-logger-test');

  logger.debug('hello, debug');
  logger.info('hello, info');
  logger.log('hello, log');
  logger.warn('hello, warn');
  logger.error('hello, error');

  logger.group('hello, group 1');
  logger.log('hello, log group 1');
  logger.group('hello, group 2');
  logger.log('hello, log group 2');
  logger.groupEnd();
  logger.groupEnd();

  logger.groupCollapsed('hello, groupCollapsed 1');
  logger.log('hello, log group 1');
  logger.groupCollapsed('hello, groupCollapsed 2');
  logger.log('hello, log group 2');
  logger.groupEnd();
  logger.groupEnd();
});

test.serial('should be able to find browser from package.json', async (t) => {
  const pkg = await getPackage();

  const browserPath = path.join(rootDir, pkg.browser);
  await fs.access(browserPath);
  t.pass();
});
