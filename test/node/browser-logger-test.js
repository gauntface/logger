import test from 'ava';
import sinon from 'sinon';
import {Logger} from '../../src/browser/browser.js';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

const methods = [
  'debug',
  'info',
  'log',
  'warn',
  'error',
  'group',
  'groupCollapsed',
];
methods.forEach(m => {
  // Broken out into individual tests since ava uses console.log()
  // which can causes the call count to be wrong.
  test.serial(`logger.${m} with default prefixes`, (t) => {
    const s = t.context.sandbox.spy(console, m);
    const MSG = 'hello default prefixes';
    const logger = new Logger();

    logger[m](MSG);
    logger.groupEnd();

    t.deepEqual(s.callCount, 1);
    t.deepEqual(s.getCall(0).args[2], MSG);
  });

  test.serial(`logger.${m} with custom prefix string`, (t) => {
    const s = t.context.sandbox.spy(console, m);
    const PREFIX = 'logger-test';
    const MSG = 'hello test prefix';
    const logger = new Logger({
      prefix: PREFIX,
    });

    logger[m](MSG);
    logger.groupEnd();

    t.deepEqual(s.callCount, 1);
    t.notDeepEqual(s.getCall(0).args[0].indexOf(PREFIX), -1);
    t.deepEqual(s.getCall(0).args[2], MSG);
  });
});

test.serial('nest groups', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'group');
  const logEndSpy = t.context.sandbox.spy(console, 'groupEnd');

  const MSG = 'hello, group';

  const logger = new Logger();
  logger.group(MSG);
  logger.info('Level 1');
  logger.group(MSG);
  logger.info('Level 2');
  logger.groupEnd();
  logger.groupEnd();

  t.deepEqual(logSpy.callCount, 2);
  t.deepEqual(logSpy.getCall(0).args[2], MSG);
  t.deepEqual(logEndSpy.callCount, 2);
});

test.serial('nest collapsed groups', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'groupCollapsed');
  const logEndSpy = t.context.sandbox.spy(console, 'groupEnd');

  const MSG = 'hello, groupCollapsed';

  const logger = new Logger();
  logger.groupCollapsed(MSG);
  logger.info('Level 1');
  logger.groupCollapsed(MSG);
  logger.info('Level 2');
  logger.groupEnd();
  logger.groupEnd();

  t.deepEqual(logSpy.callCount, 2);
  t.deepEqual(logSpy.getCall(0).args[2], MSG);
  t.deepEqual(logEndSpy.callCount, 2);
});
