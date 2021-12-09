import { injectable } from "inversify";

import { Logger } from "tslog";
import { ILogger } from "./logger.interface";

@injectable()
export class LoggerService implements ILogger {
  private logger: Logger;

  constructor() {
    this.logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFilePath: "hidden",
      displayFunctionName: false,
    });
  }

  debug(...args: unknown[]): void {
    this.logger.debug(...args);
  }

  error(...args: unknown[]): void {
    this.logger.error(...args);
  }

  fatal(err: Error): void {
    this.logger.fatal(err);
  }

  info(...args: unknown[]): void {
    this.logger.info(...args);
  }

  warn(...args: unknown[]): void {
    this.logger.warn(...args);
  }
}
