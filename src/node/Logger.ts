import chalk from 'chalk';

import {AbstractLogger, LoggerOpts} from '../interfaces/AbstractLogger';
import * as LogLevels from '../types/LogLevels';
import * as LogColors from '../types/LogColors';

export class Logger extends AbstractLogger {
  protected colorPrefix(logLevel: LogLevels.LogLevel,prefix: string): string {
    const color = this.getChalkColor(logLevel);
    return color(prefix);
  }

  private getChalkColor(logLevel: LogLevels.LogLevel): Function {
    switch(logLevel) {
      case LogLevels.DEBUG:
        return chalk.hex(LogColors.DEBUG);
      case LogLevels.INFO:
        return chalk.hex(LogColors.INFO);
      case LogLevels.LOG:
        return chalk.hex(LogColors.LOG);
      case LogLevels.WARN:
        return chalk.hex(LogColors.WARN);
      case LogLevels.ERROR:
        return chalk.hex(LogColors.ERROR);
    }
  }
}
