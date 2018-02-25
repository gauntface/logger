import {test} from 'ava';
import * as sinon from 'sinon';

import {Logger} from '../../src/node/Logger';

test.beforeEach((t) => {
  t.context.sandbox = sinon.sandbox.create();
});

test.afterEach((t) => {
  t.context.sandbox.restore();
});

test.serial('should print log without prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'log');

  const MSG = 'hello, world';

  const logger = new Logger();
  logger.log(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [MSG]);
});

test.serial('should print log with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'log');

  const PREFIX = 'hopin-logger-test';
  const MSG = 'hello, world';

  const logger = new Logger({
    prefix: PREFIX
  });
  logger.log(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args, [`\u001b[38;5;77m${PREFIX}\u001b[39m`, MSG]);
});

