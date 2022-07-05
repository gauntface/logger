import {BrowserLogger} from './_BrowserLogger.js';
import * as LogLevels from '../types/_LogLevels.js';

const logger = new BrowserLogger();
export {BrowserLogger as Logger, logger, LogLevels};