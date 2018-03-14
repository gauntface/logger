import { LoggerOpts } from "../shared/AbstractLogger";
import { LoggerFactory } from "../shared/LoggerFactory";
import { NodeLogger } from "./NodeLogger";

export const nodeFactory = new LoggerFactory<NodeLogger>(NodeLogger);
