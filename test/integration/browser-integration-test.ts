import *  as path from 'path';
import {test} from 'ava';
import * as puppeteer from 'puppeteer';

import {TestServer} from '../utils/TestServer';

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

  t.deepEqual(messageData.length, 17);

  t.deepEqual(messageData[0], {
    type: 'debug',
    text: '%choping-logger-test background: #bdc3c7; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, debug',
  });

  t.deepEqual(messageData[1], {
    type: 'info',
    text: '%choping-logger-test background: #487eb0; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, info',
  });

  t.deepEqual(messageData[2], {
    type: 'log',
    text: '%choping-logger-test background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log',
  });

  t.deepEqual(messageData[3], {
    type: 'warning',
    text: '%choping-logger-test background: #e1b12c; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, warn',
  });

  t.deepEqual(messageData[4], {
    type: 'error',
    text: '%choping-logger-test background: #e74c3c; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, error',
  });

  t.deepEqual(messageData[5], {
    type: 'startGroup',
    text: '%choping-logger-test background: #00a8ff; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, group 1',
  });

  t.deepEqual(messageData[6], {
    type: 'log',
    text: '%choping-logger-test background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 1',
  });

  t.deepEqual(messageData[7], {
    type: 'startGroup',
    text: '%choping-logger-test background: #00a8ff; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, group 2',
  });

  t.deepEqual(messageData[8], {
    type: 'log',
    text: '%choping-logger-test background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 2',
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
    text: '%choping-logger-test background: #00a8ff; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, groupCollapsed 1',
  });

  t.deepEqual(messageData[12], {
    type: 'log',
    text: '%choping-logger-test background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 1',
  });

  t.deepEqual(messageData[13], {
    type: 'startGroupCollapsed',
    text: '%choping-logger-test background: #00a8ff; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, groupCollapsed 2',
  });

  t.deepEqual(messageData[14], {
    type: 'log',
    text: '%choping-logger-test background: #4cd137; color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 2',
  });

  t.deepEqual(messageData[15], {
    type: 'endGroup',
    text: 'console.groupEnd',
  });

  t.deepEqual(messageData[16], {
    type: 'endGroup',
    text: 'console.groupEnd',
  });
});
