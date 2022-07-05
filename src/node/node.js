import {NodeLogger} from './_NodeLogger.js';
import * as LogLevels from '../types/_LogLevels.js';

const logger = new NodeLogger();
export {NodeLogger as Logger};
export {LogLevels};
export {logger};