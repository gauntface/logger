import path from 'path';
import test from 'ava';
import fs from 'fs-extra';

// Note this is from build/test/...
const rootDir = path.resolve();

function getPackage() {
  return fs.readJson(path.join(rootDir, 'package.json'));
}

test.serial('should be able to require Logger from package.json', async (t) => {
  const pkg = await getPackage();
  const nodePath = path.join(rootDir, pkg.main);
  await fs.access(nodePath);
  const {Logger} = await import(nodePath);
  t.truthy(Logger);

  const instance = new Logger({prefix: 'logger-test'});
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

test.serial('should be able to find browser from package.json', async (t) => {
  const pkg = await getPackage();

  const browserPath = path.join(rootDir, pkg.browser);
  await fs.access(browserPath);
  t.pass();
});
