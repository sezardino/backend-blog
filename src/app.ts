import express, { Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import { TYPES } from "./container/container.types";
import { IExceptionFilter } from "./errors/exceptonFilter.interface";
import { ILogger } from "./logger/logger.interface";

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter
  ) {
    this.app = express();
    this.port = 1234;
  }

  private useMiddleware(): void {
    this.logger.info("no middlewares");
  }

  private useRoutes(): void {
    this.logger.info("no routes");
  }

  private useExceptions(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public init(): void {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptions();

    this.server = this.app.listen(this.port);
    this.logger.info("Server started on port: " + this.port);
  }
}
