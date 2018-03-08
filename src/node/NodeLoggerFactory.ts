import { FactoryOpts, AbstractLoggerFactory } from "../interfaces/AbstractLoggerFactory";
import {NodeLogger} from './NodeLogger';
import { LoggerOpts, AbstractLogger } from "../interfaces/AbstractLogger";

export class NodeLoggerFactory extends AbstractLoggerFactory<NodeLogger> {
  constructor() {
    super(NodeLogger);
  }
}

