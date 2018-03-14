import { LoggerOpts } from "../interfaces/AbstractLogger";
import { AbstractLoggerFactory } from "../interfaces/AbstractLoggerFactory";
import { BrowserLogger } from './BrowserLogger';

export const browserFactory = new AbstractLoggerFactory<BrowserLogger>(BrowserLogger);
