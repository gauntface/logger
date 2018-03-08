import {test} from 'ava';
import * as sinon from 'sinon';

import {Logger} from '../../src/browser/Logger';

test.beforeEach((t) => {
  t.context.sandbox = sinon.sandbox.create();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should print debug without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'debug');

  const MSG = 'hello, debug';

  const logger = new Logger();
  logger.debug(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print debug with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'debug');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, debug';

  const logger = new Logger({
    prefix: PREFIX
  });
  logger.debug(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [`%c${PREFIX}`, 'background: #bdc3c7; color: white; padding: 2px 0.5em; border-radius: 0.5em', MSG]);
});

test.serial('should print info without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'info');

  const MSG = 'hello, info';

  const logger = new Logger();
  logger.info(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print info with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'info');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, info';

  const logger = new Logger({
    prefix: PREFIX
  });
  logger.info(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [`%c${PREFIX}`, 'background: #487eb0; color: white; padding: 2px 0.5em; border-radius: 0.5em', MSG]);
});

test.serial('should print log without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'log');

  const MSG = 'hello, log';

  const logger = new Logger();
  logger.log(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print log with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'log');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, log';

  const logger = new Logger({
    prefix: PREFIX
  });
  logger.log(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [`%c${PREFIX}`, 'background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em', MSG]);
});

test.serial('should print warn without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'warn');

  const MSG = 'hello, warn';

  const logger = new Logger();
  logger.warn(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print warn with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'warn');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, warn';

  const logger = new Logger({
    prefix: PREFIX
  });
  logger.warn(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [`%c${PREFIX}`, 'background: #e1b12c; color: white; padding: 2px 0.5em; border-radius: 0.5em', MSG]);
});

test.serial('should print error without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'error');

  const MSG = 'hello, error';

  const logger = new Logger();
  logger.error(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print error with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'error');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, error';

  const logger = new Logger({
    prefix: PREFIX
  });
  logger.error(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [`%c${PREFIX}`, 'background: #e74c3c; color: white; padding: 2px 0.5em; border-radius: 0.5em', MSG]);
});

test.serial('should print group without prefix', (t) => {
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
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
  t.deepEqual(logEndSpy.callCount, 2);
});

test.serial('should print group with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'group');
  const logEndSpy = t.context.sandbox.spy(console, 'groupEnd');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, group';

  const logger = new Logger({
    prefix: PREFIX
  });
  logger.group(MSG);
  logger.info('Level 1');
  logger.group(MSG);
  logger.info('Level 2');
  logger.groupEnd();
  logger.groupEnd();

  t.deepEqual(logSpy.callCount, 2);
  t.deepEqual(logSpy.getCall(0).args, [`%c${PREFIX}`, 'background: #00a8ff; color: white; padding: 2px 0.5em; border-radius: 0.5em', MSG]);
  t.deepEqual(logEndSpy.callCount, 2);
});

test.serial('should print groupCollapsed without prefix', (t) => {
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
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
  t.deepEqual(logEndSpy.callCount, 2);
});

test.serial('should print groupCollapsed with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'groupCollapsed');
  const logEndSpy = t.context.sandbox.spy(console, 'groupEnd');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, groupCollapsed';

  const logger = new Logger({
    prefix: PREFIX
  });
  logger.groupCollapsed(MSG);
  logger.info('Level 1');
  logger.groupCollapsed(MSG);
  logger.info('Level 2');
  logger.groupEnd();
  logger.groupEnd();

  t.deepEqual(logSpy.callCount, 2);
  t.deepEqual(logSpy.getCall(0).args, [`%c${PREFIX}`, 'background: #00a8ff; color: white; padding: 2px 0.5em; border-radius: 0.5em', MSG]);
  t.deepEqual(logEndSpy.callCount, 2);
});
