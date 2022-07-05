import {AbstractLogger} from '../shared/_AbstractLogger.js';
import * as LogLevels from '../types/_LogLevels.js';
import * as LogColors from '../types/_LogColors.js';

export class BrowserLogger extends AbstractLogger {
  /**
   * @protected
   * @param {LogLevels.LogLevel} logLevel
   * @param {string} prefix
   * @returns string[]
   */
  colorPrefix(logLevel,prefix) {
    return [`%c${prefix}`, this.getLevelCSS(logLevel)];
  }

  /**
   * @private
   * @param {LogLevels.LogLevel} logLevel
   * @returns string
   */
  getLevelCSS(logLevel) {
    /**
     * @param {LogColors.RGBColor} color
     * @returns string
     */
    function getStyles(color) {
      return `background: rgb(${color.red}, ${color.green}, ${color.blue}); color: white; padding: 2px 0.5em; border-radius: 0.5em`;
    }

    switch(logLevel) {
      case LogLevels.DEBUG:
        return getStyles(LogColors.DEBUG);
      case LogLevels.INFO:
        return getStyles(LogColors.INFO);
      case LogLevels.WARN:
        return getStyles(LogColors.WARN);
      case LogLevels.ERROR:
        return getStyles(LogColors.ERROR);
      case LogLevels.GROUP:
        return getStyles(LogColors.GROUP);
      case LogLevels.LOG:
      default:
        return getStyles(LogColors.LOG);
    }
  }
}
