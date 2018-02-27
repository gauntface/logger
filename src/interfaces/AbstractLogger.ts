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
    let consoleFunc = console.debug;
    if (!consoleFunc) {
      consoleFunc = console.info;
    }
    this.print(consoleFunc, LogLevels.DEBUG, args);
  }

  public info(...args: any[]) {
    this.print(console.info, LogLevels.INFO, args);
  }

  public log(...args: any[]) {
    this.print(console.log, LogLevels.LOG, args);
  }

  public warn(...args: any[]) {
    this.print(console.warn, LogLevels.WARN, args);
  }

  public error(...args: any[]) {
    this.print(console.error, LogLevels.ERROR, args);
  }

  public group(...args: any[]) {
    this.print(console.group, LogLevels.GROUP, args);
  }

  public groupCollapsed(...args: any[]) {
    this.print(console.groupCollapsed, LogLevels.GROUP, args);
  }

  public groupEnd() {
    console.groupEnd();
  }

  private print(consoleFunc: Function, logLevel: LogLevels.LogLevel, args: any[]) {
    consoleFunc(...this.getArgs(logLevel, args));
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
