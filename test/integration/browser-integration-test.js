import path from 'path';
import test from 'ava';
import puppeteer from 'puppeteer';

import {TestServer} from '../utils/TestServer.js';

let server;
let serverAddress;
let browser;
let page;

async function setupServer() {
  server = new TestServer(path.resolve());
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

test.serial('log in browser', async (t) => {
  page.on('error', msg => {
    t.fail(msg.message);
  });

  const messageData = [];
  page.on('console', msg => {
    messageData.push({
      type: msg.type(),
      text: msg.text(),
    });
  });

  const response = await page.goto(`${serverAddress}/test/static/logger-integration/`, {
    waitUntil: 'networkidle0',
  });
  t.deepEqual(response.status(), 200);

  t.deepEqual(messageData.length, 34);

  t.deepEqual(messageData, [
    {
      type: 'debug',
      text: `%c🐛 background: rgb(99, 110, 114); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, debug`,
    },
    {
      type: 'info',
      text: '%cℹ️ background: rgb(72, 126, 176); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, info',
    },
    {
      type: 'log',
      text: '%c💬 background: rgb(76, 209, 55); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log',
    },
    {
      type: 'warning',
      text: '%c⚠️ background: rgb(225, 177, 44); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, warn',
    },
    {
      type: 'error',
      text: '%c☠️ background: rgb(231, 76, 60); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, error',
    },
    {
      type: 'startGroup',
      text: '%c🧵 background: rgb(0, 168, 255); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, group 1',
    },
    {
      type: 'log',
      text: '%c💬 background: rgb(76, 209, 55); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 1',
    },
    {
      type: 'startGroup',
      text: '%c🧵 background: rgb(0, 168, 255); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, group 2',
    },
    {
      type: 'log',
      text: '%c💬 background: rgb(76, 209, 55); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 2',
    },
    {
      type: 'endGroup',
      text: 'console.groupEnd',
    },
    {
      type: 'endGroup',
      text: 'console.groupEnd',
    },
    {
      type: 'startGroupCollapsed',
      text: '%c🧵 background: rgb(0, 168, 255); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, groupCollapsed 1',
    },
    {
      type: 'log',
      text: '%c💬 background: rgb(76, 209, 55); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 1',
    },
    {
      type: 'startGroupCollapsed',
      text: '%c🧵 background: rgb(0, 168, 255); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, groupCollapsed 2',
    },
    {
      type: 'log',
      text: '%c💬 background: rgb(76, 209, 55); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 2',
    },
    {
      type: 'endGroup',
      text: 'console.groupEnd',
    },
    {
      type: 'endGroup',
      text: 'console.groupEnd',
    },

    {
      type: 'debug',
      text: `%ccustom-logger-test background: rgb(99, 110, 114); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, debug`,
    },
    {
      type: 'info',
      text: '%ccustom-logger-test background: rgb(72, 126, 176); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, info',
    },
    {
      type: 'log',
      text: '%ccustom-logger-test background: rgb(76, 209, 55); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log',
    },
    {
      type: 'warning',
      text: '%ccustom-logger-test background: rgb(225, 177, 44); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, warn',
    },
    {
      type: 'error',
      text: '%ccustom-logger-test background: rgb(231, 76, 60); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, error',
    },
    {
      type: 'startGroup',
      text: '%ccustom-logger-test background: rgb(0, 168, 255); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, group 1',
    },
    {
      type: 'log',
      text: '%ccustom-logger-test background: rgb(76, 209, 55); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 1',
    },
    {
      type: 'startGroup',
      text: '%ccustom-logger-test background: rgb(0, 168, 255); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, group 2',
    },
    {
      type: 'log',
      text: '%ccustom-logger-test background: rgb(76, 209, 55); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 2',
    },
    {
      type: 'endGroup',
      text: 'console.groupEnd',
    },
    {
      type: 'endGroup',
      text: 'console.groupEnd',
    },
    {
      type: 'startGroupCollapsed',
      text: '%ccustom-logger-test background: rgb(0, 168, 255); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, groupCollapsed 1',
    },
    {
      type: 'log',
      text: '%ccustom-logger-test background: rgb(76, 209, 55); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 1',
    },
    {
      type: 'startGroupCollapsed',
      text: '%ccustom-logger-test background: rgb(0, 168, 255); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, groupCollapsed 2',
    },
    {
      type: 'log',
      text: '%ccustom-logger-test background: rgb(76, 209, 55); color: white; padding: 2px 0.5em; border-radius: 0.5em hello, log group 2',
    },
    {
      type: 'endGroup',
      text: 'console.groupEnd',
    },
    {
      type: 'endGroup',
      text: 'console.groupEnd',
    },
  ]);
});
