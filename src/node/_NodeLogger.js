import {AbstractLogger} from '../shared/_AbstractLogger.js';
import * as LogLevels from '../types/_LogLevels.js';
import * as LogColors from '../types/_LogColors.js';

export class NodeLogger extends AbstractLogger {
  /**
   * @protected
   * @param {LogLevels.LogLevel} logLevel
   * @param {string} prefix
   * @returns string[]
   */
  colorPrefix(logLevel,prefix) {
    const color = this.getANSIColor(logLevel);
    return [`${color}${prefix}${resetAnsi()}`];
  }

  /**
   * @private
   * @param {LogLevels.LogLevel} logLevel
   * @returns Function
   */
  getANSIColor(logLevel) {
    switch(logLevel) {
      case LogLevels.DEBUG:
        return toAnsi(LogColors.DEBUG);
      case LogLevels.INFO:
        return toAnsi(LogColors.INFO);
      case LogLevels.WARN:
        return toAnsi(LogColors.WARN);
      case LogLevels.ERROR:
        return toAnsi(LogColors.ERROR);
      case LogLevels.GROUP:
        return toAnsi(LogColors.GROUP);
      case LogLevels.LOG:
      default:
        return toAnsi(LogColors.LOG);
    }
  }
}

function toAnsi({red, green, blue}) {
  return `\x1b[38;2;${red};${green};${blue}m`
}

function resetAnsi() {
  return `\x1b[0m`;
}
