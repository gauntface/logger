import {BrowserLogger} from './BrowserLogger';
import {browserFactory} from './browserFactory';

export {BrowserLogger as Logger};
export {browserFactory as factory};

const logger = new BrowserLogger();
export {logger};