import {BrowserLogger} from './_BrowserLogger';
import * as LogLevels from '../types/_LogLevels';

export {BrowserLogger as Logger};
export {LogLevels};

const logger = new BrowserLogger();
export {logger};