import {test} from 'ava';
import * as chalk from 'chalk';
import * as sinon from 'sinon';

import {logger} from '../../src/browser/index';
import * as LogColors from '../../src/types/LogColors';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should print debug without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'debug');

  const MSG = 'hello, debug';

  logger.debug(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print debug with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'debug');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, debug';

  logger.setPrefix(PREFIX);
  logger.debug(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [`%c${PREFIX}`, `background: ${LogColors.DEBUG}; color: white; padding: 2px 0.5em; border-radius: 0.5em`, MSG]);
});