import {AbstractLogger} from '../shared/AbstractLogger';
import * as LogLevels from '../types/LogLevels';
import * as LogColors from '../types/LogColors';

export class BrowserLogger extends AbstractLogger {
  protected colorPrefix(logLevel: LogLevels.LogLevel,prefix: string): string[] {
    const prefixStyles = this.getLevelCSS(logLevel);
    return [`%c${prefix}`, prefixStyles];
  }

  private getLevelCSS(logLevel: LogLevels.LogLevel): string | null {
    function getStyles(color: string): string {
      return `background: ${color}; color: white; padding: 2px 0.5em; border-radius: 0.5em`;
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
