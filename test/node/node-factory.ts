import {test} from 'ava';
import * as sinon from 'sinon';
import {nodeFactory} from '../../src/node/nodeFactory';
import {NodeLogger} from '../../src/node/NodeLogger';

const LOGGER_ID = 'test-logger-id';

test.beforeEach((t) => {
  t.context.sandbox = sinon.sandbox.create();
  nodeFactory.clearLogger(LOGGER_ID);
});

test.afterEach.always((t) => {
  t.context.sandbox.restore();
});

test.serial('should create and retrieve a NodeLogger with no prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'log');
  const MSG = 'Log test';

  const example1 = nodeFactory.getLogger(LOGGER_ID);
  t.true(example1 instanceof NodeLogger);

  const example2 = nodeFactory.getLogger(LOGGER_ID);
  t.true(example1 === example2);

  example1.log(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.deepEqual(logSpy.getCall(0).args[0], MSG);
});

test.serial('should create a NodeLogger with prefix', (t) => {
  const logSpy = t.context.sandbox.spy(console, 'log');
  const PREFIX = 'example-prefix';
  const MSG = 'Log test';

  const logger = nodeFactory.getLogger(LOGGER_ID, {
    prefix: PREFIX,
  });
  t.true(logger instanceof NodeLogger);

  logger.log(MSG);

  t.deepEqual(logSpy.callCount, 1);
  t.notDeepEqual(logSpy.getCall(0).args[0].indexOf(PREFIX), -1);
  t.deepEqual(logSpy.getCall(0).args[1], MSG);
});
