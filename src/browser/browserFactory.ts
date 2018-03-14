import { LoggerOpts } from "../shared/AbstractLogger";
import { LoggerFactory } from "../shared/LoggerFactory";
import { BrowserLogger } from './BrowserLogger';

export const browserFactory = new LoggerFactory<BrowserLogger>(BrowserLogger);
