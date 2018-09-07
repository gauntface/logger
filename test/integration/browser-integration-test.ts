import *  as path from 'path';
import {test} from 'ava';
import * as puppeteer from 'puppeteer';

import {TestServer} from '../utils/TestServer';
import * as LogColors from '../../src/types/LogColors';

let server: TestServer;
let serverAddress: string;
let browser: puppeteer.Browser;
let page: puppeteer.Page;

interface MsgData {
  type: string;
  text: string;
}

async function setupServer() {
  server = new TestServer(path.join(__dirname, '..', '..', '..'));
  serverAddress = await server.start();
}

async function setupPuppeteer() {
  browser = await puppeteer.launch({args: ['--no-sandbox']});
  page = await browser.newPage();
}

test.before(async () => {
  await Promise.all([
    setupServer(),
    setupPuppeteer(),
  ]);
});

test.after.always(async () => {
  await Promise.all([
    browser.close(),
    server.close(),
  ]);
});

test.serial('should log in browser', async (t) => {
  page.on('error', msg => {
    t.fail(msg.message);
  });

  const messageData: MsgData[] = [];
  page.on('console', msg => {
    messageData.push({
      type: msg.type(),
      text: msg.text(),
    });
  });

  const response = await page.goto(`${serverAddress}/build/test/static/logger-integration/`);
  t.deepEqual(response.status(), 200);

  t.deepEqual(messageData.length, 34);

  t.deepEqual(messageData[0], {
    type: 'debug',
    text: `%chopin-custom-logger-test background: ${LogColors.DEBUG}; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, debug`,
  });

  t.deepEqual(messageData[1], {
    type: 'info',
    text: '%chopin-custom-logger-test background: #487eb0; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, info',
  });

  t.deepEqual(messageData[2], {
    type: 'log',
    text: '%chopin-custom-logger-test background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log',
  });

  t.deepEqual(messageData[3], {
    type: 'warning',
    text: '%chopin-custom-logger-test background: #e1b12c; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, warn',
  });

  t.deepEqual(messageData[4], {
    type: 'error',
    text: '%chopin-custom-logger-test background: #e74c3c; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, error',
  });

  t.deepEqual(messageData[5], {
    type: 'startGroup',
    text: '%chopin-custom-logger-test background: #00a8ff; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, group 1',
  });

  t.deepEqual(messageData[6], {
    type: 'log',
    text: '%chopin-custom-logger-test background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 1',
  });

  t.deepEqual(messageData[7], {
    type: 'startGroup',
    text: '%chopin-custom-logger-test background: #00a8ff; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, group 2',
  });

  t.deepEqual(messageData[8], {
    type: 'log',
    text: '%chopin-custom-logger-test background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 2',
  });

  t.deepEqual(messageData[9], {
    type: 'endGroup',
    text: 'console.groupEnd',
  });

  t.deepEqual(messageData[10], {
    type: 'endGroup',
    text: 'console.groupEnd',
  });

  t.deepEqual(messageData[11], {
    type: 'startGroupCollapsed',
    text: '%chopin-custom-logger-test background: #00a8ff; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, groupCollapsed 1',
  });

  t.deepEqual(messageData[12], {
    type: 'log',
    text: '%chopin-custom-logger-test background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 1',
  });

  t.deepEqual(messageData[13], {
    type: 'startGroupCollapsed',
    text: '%chopin-custom-logger-test background: #00a8ff; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, groupCollapsed 2',
  });

  t.deepEqual(messageData[14], {
    type: 'log',
    text: '%chopin-custom-logger-test background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 2',
  });

  t.deepEqual(messageData[15], {
    type: 'endGroup',
    text: 'console.groupEnd',
  });

  t.deepEqual(messageData[16], {
    type: 'endGroup',
    text: 'console.groupEnd',
  });

  t.deepEqual(messageData[17], {
    type: 'debug',
    text: `%chopin-default-logger-test background: ${LogColors.DEBUG}; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, debug`,
  });

  t.deepEqual(messageData[18], {
    type: 'info',
    text: '%chopin-default-logger-test background: #487eb0; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, info',
  });

  t.deepEqual(messageData[19], {
    type: 'log',
    text: '%chopin-default-logger-test background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log',
  });

  t.deepEqual(messageData[20], {
    type: 'warning',
    text: '%chopin-default-logger-test background: #e1b12c; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, warn',
  });

  t.deepEqual(messageData[21], {
    type: 'error',
    text: '%chopin-default-logger-test background: #e74c3c; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, error',
  });

  t.deepEqual(messageData[22], {
    type: 'startGroup',
    text: '%chopin-default-logger-test background: #00a8ff; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, group 1',
  });

  t.deepEqual(messageData[23], {
    type: 'log',
    text: '%chopin-default-logger-test background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 1',
  });

  t.deepEqual(messageData[24], {
    type: 'startGroup',
    text: '%chopin-default-logger-test background: #00a8ff; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, group 2',
  });

  t.deepEqual(messageData[25], {
    type: 'log',
    text: '%chopin-default-logger-test background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 2',
  });

  t.deepEqual(messageData[26], {
    type: 'endGroup',
    text: 'console.groupEnd',
  });

  t.deepEqual(messageData[27], {
    type: 'endGroup',
    text: 'console.groupEnd',
  });

  t.deepEqual(messageData[28], {
    type: 'startGroupCollapsed',
    text: '%chopin-default-logger-test background: #00a8ff; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, groupCollapsed 1',
  });

  t.deepEqual(messageData[29], {
    type: 'log',
    text: '%chopin-default-logger-test background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 1',
  });

  t.deepEqual(messageData[30], {
    type: 'startGroupCollapsed',
    text: '%chopin-default-logger-test background: #00a8ff; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, groupCollapsed 2',
  });

  t.deepEqual(messageData[31], {
    type: 'log',
    text: '%chopin-default-logger-test background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 2',
  });

  t.deepEqual(messageData[32], {
    type: 'endGroup',
    text: 'console.groupEnd',
  });

  t.deepEqual(messageData[33], {
    type: 'endGroup',
    text: 'console.groupEnd',
  });
});
