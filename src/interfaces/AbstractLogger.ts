import * as LogLevels from '../types/LogLevels';

export type LoggerOpts = {
  prefix?: string;
};

export abstract class AbstractLogger {
  protected opts: LoggerOpts;

  constructor(opts?: LoggerOpts) {
    this.opts = opts || {};
  };

  public debug(...args: any[]) {
    console.debug(...this.getArgs(LogLevels.DEBUG, args));
  }

  public info(...args: any[]) {
    console.info(this.getPrefix(LogLevels.INFO), ...args);
  }

  public log(...args: any[]) {
    console.log(...this.getArgs(LogLevels.LOG, args));
  }

  public warn(...args: any[]) {
    // console.warn(...this.getArgs(LogLevels.WARN, args));
  }

  public error(...args: any[]) {
    console.error(this.getPrefix(LogLevels.ERROR), ...args);
  }

  private getArgs(logLevel: LogLevels.LogLevel, args: any[]): any[] {
    const prefix = this.getPrefix(logLevel);
    if (prefix) {
      return [prefix, ...args];
    }
    return args;
  }

  private getPrefix(logLevel: LogLevels.LogLevel): string|void {
    if (this.opts.prefix) {
      return this.colorPrefix(logLevel, this.opts.prefix);
    }
  }

  protected abstract colorPrefix(level: LogLevels.LogLevel, prefix: string): string;
}
