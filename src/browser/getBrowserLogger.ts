import { BrowserLoggerFactory } from "./BrowserLoggerFactory";
import { FactoryOpts } from "../interfaces/AbstractLoggerFactory";

const loggerFactory = new BrowserLoggerFactory();
export const getBrowserLogger = (id:string, prefix: string, opts?: FactoryOpts) => {
  return loggerFactory.getLogger(id, prefix, opts);
};
