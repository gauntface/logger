import test from 'ava';
import sinon from 'sinon';
import {Logger, LogLevels} from '../../src/node/node.js';
import {DEFAULT_PREFIXES} from '../../src/shared/_AbstractLogger.js';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('print with default prefixes', (t) => {
  const methods = [
    'debug',
    'info',
    'log',
    'warn',
    'error',
    'group',
    'groupCollapsed',
  ];
  const spies = methods.map(m => t.context.sandbox.spy(console, m));

  const MSG = 'hello default prefixes';

  const logger = new Logger();
  for (const m of methods) {
    logger[m](MSG);
    logger.groupEnd();
  }

  for (const s of spies) {
    t.deepEqual(s.callCount, 1);
    t.deepEqual(s.getCall(0).args[1], MSG);
  }
});

test.serial('print with custom prefix string', (t) => {
  const methods = [
    'debug',
    'info',
    'log',
    'warn',
    'error',
    'group',
    'groupCollapsed',
  ];
  const spies = methods.map(m => t.context.sandbox.spy(console, m));

  const PREFIX = 'logger-test';
  const MSG = 'hello test prefix';

  const logger = new Logger({
    prefix: PREFIX,
  });
  for (const m of methods) {
    logger[m](MSG);
    logger.groupEnd();
  }

  for (const s of spies) {
    t.deepEqual(s.callCount, 1);
    t.notDeepEqual(s.getCall(0).args[0].indexOf(PREFIX), -1);
    t.deepEqual(s.getCall(0).args[1], MSG);
  }
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
  t.deepEqual(logSpy.getCall(0).args[1], MSG);
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
  t.deepEqual(logSpy.getCall(0).args[1], MSG);
  t.deepEqual(logEndSpy.callCount, 2);
});

test.serial('use custom object prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'log');
  const debugSpy = t.context.sandbox.spy(console, 'debug');

  const PREFIX = 'custom-prefix';
  const MSG = 'hello, custom prefix';

  const logger = new Logger();
  logger.setPrefix({
    [LogLevels.LOG]: PREFIX,
  });

  t.deepEqual(logger.opts.prefix, Object.assign(DEFAULT_PREFIXES, {
    [LogLevels.LOG]: 'custom-prefix'
  }));

  logger.log(MSG);
  logger.debug(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.notDeepEqual(logSpy.getCall(0).args[0].indexOf(PREFIX), -1);
  t.deepEqual(logSpy.getCall(0).args[1], MSG);

  t.deepEqual(debugSpy.callCount, 1);
  t.deepEqual(debugSpy.getCall(0).args[0].indexOf(PREFIX), -1);
  t.deepEqual(debugSpy.getCall(0).args[1], MSG);
});