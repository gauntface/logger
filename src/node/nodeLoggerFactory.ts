import { FactoryOpts, AbstractLoggerFactory } from "../interfaces/AbstractLoggerFactory";
import {NodeLogger} from './NodeLogger';
import { LoggerOpts, AbstractLogger } from "../interfaces/AbstractLogger";

class NodeLoggerFactory extends AbstractLoggerFactory {
  protected createNewLogger(opts: LoggerOpts): AbstractLogger {
    return new NodeLogger(opts);
  }
}

const loggerFactory = new NodeLoggerFactory();
export const getLogger = (id:string, prefix: string, opts?: FactoryOpts) => {
  return loggerFactory.getLogger(id, prefix, opts);
};
