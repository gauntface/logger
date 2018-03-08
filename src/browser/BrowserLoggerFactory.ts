import { FactoryOpts, AbstractLoggerFactory } from "../interfaces/AbstractLoggerFactory";
import { BrowserLogger } from './BrowserLogger';
import { LoggerOpts, AbstractLogger } from "../interfaces/AbstractLogger";

export class BrowserLoggerFactory extends AbstractLoggerFactory<BrowserLogger> {
  constructor() {
    super(BrowserLogger);
  }
}

