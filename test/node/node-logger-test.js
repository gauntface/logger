const {test} = require('ava');
const sinon = require('sinon');

const LogLevels = require('../../build-node/types/LogLevels');
const {NodeLogger} = require('../../build-node/node/NodeLogger');

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should not print debug by default', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'debug');

  const MSG = 'hello, debug';

  const logger = new NodeLogger();
  logger.debug(MSG);

  t.deepEqual(logSpy.callCount, 0);
});

test.serial('should print debug without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'debug');

  const MSG = 'hello, debug';

  const logger = new NodeLogger();
  logger.setLogLevel(LogLevels.DEBUG);
  logger.debug(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print debug with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'debug');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, debug';

  const logger = new NodeLogger({
    prefix: PREFIX
  });
  logger.setLogLevel(LogLevels.DEBUG);
  logger.debug(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.notDeepEqual(logSpy.getCall(0).args[0].indexOf(PREFIX), -1);
  t.deepEqual(logSpy.getCall(0).args[1], MSG);
});

test.serial('should not print info by default', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'info');

  const MSG = 'hello, info';

  const logger = new NodeLogger();
  logger.info(MSG);

  t.deepEqual(logSpy.callCount, 0);
});

test.serial('should print info without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'info');

  const MSG = 'hello, info';

  const logger = new NodeLogger();
  logger.setLogLevel(LogLevels.INFO);
  logger.info(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print info with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'info');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, info';

  const logger = new NodeLogger({
    prefix: PREFIX
  });
  logger.setLogLevel(LogLevels.INFO);
  logger.info(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.notDeepEqual(logSpy.getCall(0).args[0].indexOf(PREFIX), -1);
  t.deepEqual(logSpy.getCall(0).args[1], MSG);
});

test.serial('should print log without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'log');

  const MSG = 'hello, log';

  const logger = new NodeLogger();
  logger.log(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print log with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'log');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, log';

  const logger = new NodeLogger({
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

  const logger = new NodeLogger();
  logger.warn(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print warn with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'warn');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, warn';

  const logger = new NodeLogger({
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

  const logger = new NodeLogger();
  logger.error(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print error with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'error');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, error';

  const logger = new NodeLogger({
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

  const logger = new NodeLogger();
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

  const logger = new NodeLogger({
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

  const logger = new NodeLogger();
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

  const logger = new NodeLogger({
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
