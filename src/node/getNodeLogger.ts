import { NodeLoggerFactory } from "./NodeLoggerFactory";
import { FactoryOpts } from "../interfaces/AbstractLoggerFactory";

const loggerFactory = new NodeLoggerFactory();
export const getNodeLogger = (id:string, prefix: string, opts?: FactoryOpts) => {
  return loggerFactory.getLogger(id, prefix, opts);
};
