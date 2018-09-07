import {BrowserLogger} from './BrowserLogger';

// This class exists solely so the default export is the logger
// with log methods while making the underlying logger available.
class BrowserNamespace extends BrowserLogger {
  get Logger() {
    return BrowserLogger;
  }
}

// logger will be used as part of the namespace
// i.e. hopin.**logger** will be the HopinLoggerBrowser instance
const logger = new BrowserNamespace();
export {logger};