import *  as path from 'path';
import {test} from 'ava';
import * as puppeteer from 'puppeteer';

import {TestServer} from '../utils/TestServer';

let server: TestServer;
let serverAddress: string;
let browser: puppeteer.Browser;
let page: puppeteer.Page;

async function setupServer() {
  server = new TestServer(path.join(__dirname, '..', 'static', 'logger-integration'));
  serverAddress = await server.start();
}

async function setupPuppeteer() {
  browser = await puppeteer.launch();
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
  await page.goto(serverAddress);



  await browser.close();
  t.pass();
});
