import * as LogLevels from '../types/LogLevels';

export type LoggerOpts = {
  prefix?: string;
};

export abstract class AbstractLogger {
  private opts: LoggerOpts;

  constructor(opts?: LoggerOpts) {
    this.opts = opts || {};
  }

  setPrefix(prefix: string) {
    this.opts.prefix = prefix;
  }

  // tslint:disable-next-line:no-any
  debug(...args: any[]) {
    this.print(console.debug, LogLevels.DEBUG, args);
  }

  // tslint:disable-next-line:no-any
  info(...args: any[]) {
    this.print(console.info, LogLevels.INFO, args);
  }

  // tslint:disable-next-line:no-any
  log(...args: any[]) {
    this.print(console.log, LogLevels.LOG, args);
  }

  // tslint:disable-next-line:no-any
  warn(...args: any[]) {
    this.print(console.warn, LogLevels.WARN, args);
  }

  // tslint:disable-next-line:no-any
  error(...args: any[]) {
    this.print(console.error, LogLevels.ERROR, args);
  }

  // tslint:disable-next-line:no-any
  group(...args: any[]) {
    this.print(console.group, LogLevels.GROUP, args);
  }

  // tslint:disable-next-line:no-any
  groupCollapsed(...args: any[]) {
    this.print(console.groupCollapsed, LogLevels.GROUP, args);
  }

  groupEnd() {
    console.groupEnd();
  }

  // tslint:disable-next-line:no-any
  private print(consoleFunc: Function, logLevel: LogLevels.LogLevel, args: any[]) {
    consoleFunc(...this.getArgs(logLevel, args));
  }

  // tslint:disable-next-line:no-any
  private getArgs(logLevel: LogLevels.LogLevel, args: any[]): any[] {
    const prefix = this.getPrefix(logLevel);
    if (prefix) {
      return [...prefix, ...args];
    }
    return args;
  }

  private getPrefix(logLevel: LogLevels.LogLevel): string[]|void {
    if (this.opts.prefix) {
      return this.colorPrefix(logLevel, this.opts.prefix);
    }
  }

  protected abstract colorPrefix(level: LogLevels.LogLevel, prefix: string): string[];
}
