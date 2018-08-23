import {BrowserLogger} from './BrowserLogger';
import {browserFactory} from './browserFactory';

// This class exists solely so the default export is the logger
// with log methods while making the underlying logger and factory available.
class BrowserNamespace extends BrowserLogger {
  get Logger() {
    return BrowserLogger;
  }

  get factory() {
    return browserFactory;
  }
}

// logger will be used as part of the namespace
// i.e. hopin.**logger** will be the HopinLoggerBrowser instance
const logger = new BrowserNamespace();
export {logger};