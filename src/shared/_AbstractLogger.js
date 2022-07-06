import * as LogLevels from '../types/_LogLevels.js';

/**
 * @typedef {{ prefix?: string|Object}} LoggerOpts
 */

export const DEFAULT_PREFIXES = {
  [LogLevels.DEBUG]: '🐛',
  [LogLevels.INFO]: 'ℹ️',
  [LogLevels.LOG]: '💬',
  [LogLevels.WARN]: '⚠️',
  [LogLevels.ERROR]: '☠️',
  [LogLevels.GROUP]: '🧵',
};

/**
 * @abstract
 */
export class AbstractLogger {
  /**
   * @property {LoggerOpts} opts?
   * @private
   */
  /**
   * @property {LogLevel} currentLogLevel
   * @private
   */

  /**
   *
   * @param {LoggerOpts|void} opts
   */
  constructor(opts) {
    this.opts = opts || {};
    this.setPrefix(this.opts.prefix);
    this.currentLogLevel = this.getDefaultLogLevel();
  }

  /**
   * @param {string|object} prefix
   */
  setPrefix(prefix) {
<<<<<<< HEAD
    if (!prefix) {
      this.opts.prefix = DEFAULT_PREFIXES;
    } else if (typeof prefix == 'object') {
=======
    if (!prefix || typeof prefix == 'object') {
>>>>>>> b0d3892 (Adding default prefix)
      this.opts.prefix = {};
      for (const k of Object.keys(DEFAULT_PREFIXES)) {
        this.opts.prefix[k] = prefix[k] || DEFAULT_PREFIXES[k];
      }
    } else {
      this.opts.prefix = prefix;
    }
  }

  /**
   * @param {LogLevels.LogLevel} logLevel
   */
  setLogLevel(logLevel) {
    this.currentLogLevel = logLevel;
  }

  /**
   * @param  {...any} args
   */
  debug(...args) {
    this.print(console.debug, LogLevels.DEBUG, args);
  }

  /**
   * @param  {...any} args
   */
  info(...args) {
    this.print(console.info, LogLevels.INFO, args);
  }

  /**
   * @param  {...any} args
   */
  log(...args) {
    this.print(console.log, LogLevels.LOG, args);
  }

  /**
   * @param  {...any} args
   */
  warn(...args) {
    this.print(console.warn, LogLevels.WARN, args);
  }

  /**
   * @param  {...any} args
   */
  error(...args) {
    this.print(console.error, LogLevels.ERROR, args);
  }

  /**
   * @param  {...any} args
   */
  group(...args) {
    this.print(console.group, LogLevels.GROUP, args);
  }

  /**
   * @param  {...any} args
   */
  groupCollapsed(...args) {
    this.print(console.groupCollapsed, LogLevels.GROUP, args);
  }

  groupEnd() {
    console.groupEnd();
  }

  /**
   * @private
   * @param {Function} consoleFunc
   * @param {LogLevels.LogLevel} logLevel
   * @param {any[]} args
   * @returns
   */
  print(consoleFunc, logLevel, args) {
    if (this.currentLogLevel > logLevel) {
      return;
    }

    consoleFunc(...this.getArgs(logLevel, args));
  }

  /**
   * @private
   * @param {LogLevels.LogLevel} logLevel
   * @param {any[]} args
   * @returns any[]
   */
  getArgs(logLevel, args) {
    const prefix = this.getPrefix(logLevel);
    if (prefix) {
      return [...prefix, ...args];
    }
    return args;
  }

  /**
   * @private
   * @param {LogLevels.LogLevel} logLevel
   * @returns string[]
   */
  getPrefix(logLevel) {
    let pre = this.opts.prefix;
    if (!pre) {
      pre = DEFAULT_PREFIXES;
    }

    let s = pre;
    if (typeof s == 'object') {
      s = pre[logLevel]
    }
    return this.colorPrefix(logLevel, s);
  }

  /**
   * @protected
   * @returns LogLevels.LogLevel
   */
  getDefaultLogLevel() {
    return LogLevels.DEBUG;
  }

  /**
   * @protected
   * @abstract
   * @param {LogLevels.LogLevel} level
   * @param {string} prefix
   * @returns []string
   * colorPrefix(level, prefix);
   */
}
