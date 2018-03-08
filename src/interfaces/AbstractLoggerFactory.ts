import { AbstractLogger, LoggerOpts } from "../interfaces/AbstractLogger";

export interface FactoryOpts {
  forceNew?: boolean;
}

export abstract class AbstractLoggerFactory<T extends AbstractLogger> {
  private type: { new(opts?: LoggerOpts): T ;};
  private loggers: {[loggerName: string]: T};

  constructor(type: { new(): T ;} ) {
    this.type =  type;
    this.loggers = {};
  }

  getLogger(id: string, prefix: string, opts?: FactoryOpts): T {
    // TODO: Same id, diff, options - what to do?
    // TODO: Reserve __hopin__ IDs
    // TODO: Implement forceNew

    if (!this.loggers[id]) {
      const newLogger = new this.type({prefix});
      this.loggers[id] = newLogger;
    }

    return this.loggers[id];
  }
}
