import * as LogLevels from '../types/_LogLevels';

export type LoggerOpts = {
  prefix?: string;
};

export abstract class AbstractLogger {
  private opts: LoggerOpts;
  private currentLogLevel: LogLevels.LogLevel;

  constructor(opts?: LoggerOpts) {
    this.opts = opts || {};
    this.currentLogLevel = this.getDefaultLogLevel();
  }

  setPrefix(prefix: string) {
    this.opts.prefix = prefix;
  }

  setLogLevel(logLevel: LogLevels.LogLevel) {
    this.currentLogLevel = logLevel;
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
    if (this.currentLogLevel > logLevel) {
      return;
    }

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

  protected getDefaultLogLevel(): LogLevels.LogLevel {
    return LogLevels.DEBUG;
  }

  protected abstract colorPrefix(level: LogLevels.LogLevel, prefix: string): string[];
}
