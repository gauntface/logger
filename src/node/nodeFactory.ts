import { LoggerOpts } from "../interfaces/AbstractLogger";
import { AbstractLoggerFactory } from "../interfaces/AbstractLoggerFactory";
import { NodeLogger } from "./NodeLogger";

export const nodeFactory = new AbstractLoggerFactory<NodeLogger>(NodeLogger);
