const test = require('ava');
const sinon = require('sinon');

const hopinlogger = require('../../build-node/node/index');

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should not print debug by default', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'debug');

  const MSG = 'hello, debug';

  const logger = new hopinlogger.Logger();
  logger.debug(MSG);

  t.deepEqual(logSpy.callCount, 0);
});

test.serial('should print debug without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'debug');

  const MSG = 'hello, debug';

  const logger = new hopinlogger.Logger();
  logger.setLogLevel(hopinlogger.LogLevels.DEBUG);
  logger.debug(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print debug with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'debug');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, debug';

  const logger = new hopinlogger.Logger({
    prefix: PREFIX
  });
  logger.setLogLevel(hopinlogger.LogLevels.DEBUG);
  logger.debug(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.notDeepEqual(logSpy.getCall(0).args[0].indexOf(PREFIX), -1);
  t.deepEqual(logSpy.getCall(0).args[1], MSG);
});

test.serial('should not print info by default', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'info');

  const MSG = 'hello, info';

  const logger = new hopinlogger.Logger();
  logger.info(MSG);

  t.deepEqual(logSpy.callCount, 0);
});

test.serial('should print info without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'info');

  const MSG = 'hello, info';

  const logger = new hopinlogger.Logger();
  logger.setLogLevel(hopinlogger.LogLevels.INFO);
  logger.info(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print info with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'info');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, info';

  const logger = new hopinlogger.Logger({
    prefix: PREFIX
  });
  logger.setLogLevel(hopinlogger.LogLevels.INFO);
  logger.info(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.notDeepEqual(logSpy.getCall(0).args[0].indexOf(PREFIX), -1);
  t.deepEqual(logSpy.getCall(0).args[1], MSG);
});

test.serial('should print log without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'log');

  const MSG = 'hello, log';

  const logger = new hopinlogger.Logger();
  logger.log(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print log with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'log');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, log';

  const logger = new hopinlogger.Logger({
    prefix: PREFIX
  });
  logger.log(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.notDeepEqual(logSpy.getCall(0).args[0].indexOf(PREFIX), -1);
  t.deepEqual(logSpy.getCall(0).args[1], MSG);
});

test.serial('should print warn without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'warn');

  const MSG = 'hello, warn';

  const logger = new hopinlogger.Logger();
  logger.warn(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print warn with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'warn');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, warn';

  const logger = new hopinlogger.Logger({
    prefix: PREFIX
  });
  logger.warn(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.notDeepEqual(logSpy.getCall(0).args[0].indexOf(PREFIX), -1);
  t.deepEqual(logSpy.getCall(0).args[1], MSG);
});

test.serial('should print error without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'error');

  const MSG = 'hello, error';

  const logger = new hopinlogger.Logger();
  logger.error(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print error with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'error');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, error';

  const logger = new hopinlogger.Logger({
    prefix: PREFIX
  });
  logger.error(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.notDeepEqual(logSpy.getCall(0).args[0].indexOf(PREFIX), -1);
  t.deepEqual(logSpy.getCall(0).args[1], MSG);
});

test.serial('should print group without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'group');
  const logEndSpy = t.context.sandbox.spy(console, 'groupEnd');

  const MSG = 'hello, group';

  const logger = new hopinlogger.Logger();
  logger.group(MSG);
  logger.info('Level 1');
  logger.group(MSG);
  logger.info('Level 2');
  logger.groupEnd();
  logger.groupEnd();

  t.deepEqual(logSpy.callCount, 2);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
  t.deepEqual(logEndSpy.callCount, 2);
});

test.serial('should print group with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'group');
  const logEndSpy = t.context.sandbox.spy(console, 'groupEnd');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, group';

  const logger = new hopinlogger.Logger({
    prefix: PREFIX
  });
  logger.group(MSG);
  logger.info('Level 1');
  logger.group(MSG);
  logger.info('Level 2');
  logger.groupEnd();
  logger.groupEnd();

  t.deepEqual(logSpy.callCount, 2);
  t.notDeepEqual(logSpy.getCall(0).args[0].indexOf(PREFIX), -1);
  t.deepEqual(logSpy.getCall(0).args[1], MSG);
  t.deepEqual(logEndSpy.callCount, 2);
});

test.serial('should print groupCollapsed without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'groupCollapsed');
  const logEndSpy = t.context.sandbox.spy(console, 'groupEnd');

  const MSG = 'hello, groupCollapsed';

  const logger = new hopinlogger.Logger();
  logger.groupCollapsed(MSG);
  logger.info('Level 1');
  logger.groupCollapsed(MSG);
  logger.info('Level 2');
  logger.groupEnd();
  logger.groupEnd();

  t.deepEqual(logSpy.callCount, 2);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
  t.deepEqual(logEndSpy.callCount, 2);
});

test.serial('should print groupCollapsed with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'groupCollapsed');
  const logEndSpy = t.context.sandbox.spy(console, 'groupEnd');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, groupCollapsed';

  const logger = new hopinlogger.Logger({
    prefix: PREFIX
  });
  logger.groupCollapsed(MSG);
  logger.info('Level 1');
  logger.groupCollapsed(MSG);
  logger.info('Level 2');
  logger.groupEnd();
  logger.groupEnd();

  t.deepEqual(logSpy.callCount, 2);
  t.notDeepEqual(logSpy.getCall(0).args[0].indexOf(PREFIX), -1);
  t.deepEqual(logSpy.getCall(0).args[1], MSG);
  t.deepEqual(logEndSpy.callCount, 2);
});

test.serial('should print info with prefix set via setPrefix()', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'info');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, info';

  const logger = new hopinlogger.Logger({
    prefix: PREFIX
  });
  logger.setLogLevel(hopinlogger.LogLevels.INFO);
  logger.info(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.notDeepEqual(logSpy.getCall(0).args[0].indexOf(PREFIX), -1);
  t.deepEqual(logSpy.getCall(0).args[1], MSG);
});