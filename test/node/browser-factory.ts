import {test} from 'ava';
import * as sinon from 'sinon';
import {browserFactory} from '../../src/browser/browserFactory';
import {BrowserLogger} from '../../src/browser/BrowserLogger';

const LOGGER_ID = 'test-logger-id';

test.beforeEach((t) => {
  t.context.sandbox = sinon.createSandbox();
  browserFactory.clearLogger(LOGGER_ID);
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should create and retrieve a NodeLogger with no prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'log');
  const MSG = 'Log test';

  const example1 = browserFactory.getLogger(LOGGER_ID);
  t.true(example1 instanceof BrowserLogger);

  const example2 = browserFactory.getLogger(LOGGER_ID);
  t.true(example1 === example2);

  example1.log(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args[0], MSG);
});

test.serial('should create a NodeLogger with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'log');
  const PREFIX = 'example-prefix';
  const MSG = 'Log test';

  const logger = browserFactory.getLogger(LOGGER_ID, {
    prefix: PREFIX,
  });
  t.true(logger instanceof BrowserLogger);

  logger.log(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.notDeepEqual(logSpy.getCall(0).args[0].indexOf(PREFIX), -1);
  t.deepEqual(logSpy.getCall(0).args[2], MSG);
});
