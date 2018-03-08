import { AbstractLogger, LoggerOpts } from "../interfaces/AbstractLogger";

export interface FactoryOpts {
  forceNew?: boolean;
}

export abstract class AbstractLoggerFactory {
  private loggers: {[loggerName: string]: AbstractLogger};

  constructor() {
    this.loggers = {};
  }

  getLogger(id: string, prefix: string, opts?: FactoryOpts): AbstractLogger {
    // TODO: Same id, diff, options - what to do?
    // TODO: Reserve __hopin__ IDs
    // TODO: Implement forceNew

    if (!this.loggers[id]) {
      const newLogger = this.createNewLogger({prefix});
      this.loggers[id] = newLogger;
    }

    return this.loggers[id];
  }

  protected abstract createNewLogger(opts: LoggerOpts): AbstractLogger;
}
