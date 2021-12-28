import { MongoService } from "./database/mongo.service";
import express, { Express } from "express";
import { Server } from "http";
import { inject, injectable } from "inversify";
import { json } from "body-parser";
import "reflect-metadata";

import { TYPES } from "./container/container.types";
import { IExceptionFilter } from "./errors/exceptonFilter.interface";
import { ILogger } from "./logger/logger.interface";
import { PostController } from "./post/post.controller";
import { UserController } from "./user/user.controller";
import { AuthMiddleware } from "./middlewares/auth.midleware";
import { IConfigService } from "./config/config.interface";

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
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
    this.app = express();
    this.port = 1234;
  }

  private useMiddleware(): void {
    this.app.use(json());
    const authMiddleware = new AuthMiddleware(
      this.configService.get("JWT_SECRET")
    );
    this.app.use(authMiddleware.execute.bind(authMiddleware));
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
