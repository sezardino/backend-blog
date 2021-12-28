import { MongoService } from './database/mongo.service';
import express, { Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import { TYPES } from "./container/container.types";
import { IExceptionFilter } from "./errors/exceptonFilter.interface";
import { ILogger } from "./logger/logger.interface";
import { PostController } from "./post/post.controller";
import { UserController } from "./user/user.controller";

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.PostController) private postController: PostController,
    @inject(TYPES.MongoService) private mongoService: MongoService,
  ) {
    this.app = express();
    this.port = 1234;
  }

  private useMiddleware(): void {
    this.logger.info("no middlewares");
  }

  private useRoutes(): void {
    this.app.use("/user", this.userController.router);
    this.app.use("/post", this.postController.router);
  }

  private useExceptions(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptions();

    await this.mongoService.connect();

    this.server = this.app.listen(this.port);
    this.logger.info("Server started on port: " + this.port);
  }
}
