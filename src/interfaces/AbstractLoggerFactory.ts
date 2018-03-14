import { AbstractLogger, LoggerOpts } from "../interfaces/AbstractLogger";

export class AbstractLoggerFactory<T extends AbstractLogger> {
  private type: { new(opts?: LoggerOpts): T ;};
  private loggers: {[loggerName: string]: T};

  constructor(type: { new(): T ;} ) {
    this.type =  type;
    this.loggers = {};
  }

  getLogger(id: string, opts?: LoggerOpts): T {
    if (!this.loggers[id]) {
      const newLogger = new this.type(opts);
      this.loggers[id] = newLogger;
    }

    return this.loggers[id];
  }

  clearLogger(id: string) {
    if(this.loggers[id]) {
      delete this.loggers[id];
    }
  }
}
