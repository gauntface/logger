import { FactoryOpts, AbstractLoggerFactory } from "../interfaces/AbstractLoggerFactory";
import { BrowserLogger } from './BrowserLogger';
import { LoggerOpts, AbstractLogger } from "../interfaces/AbstractLogger";

class BrowserLoggerFactory extends AbstractLoggerFactory {
  protected createNewLogger(opts: LoggerOpts): AbstractLogger {
    return new BrowserLogger(opts);
  }
}

const loggerFactory = new BrowserLoggerFactory();
export const getLogger = (id:string, prefix: string, opts?: FactoryOpts) => {
  return loggerFactory.getLogger(id, prefix, opts);
};

