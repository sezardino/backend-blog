import { IConfigService } from './../config/config.interface';
import { UserController } from "./../user/user.controller";
import { LoggerService } from "../logger/logger.service";
import { ILogger } from "../logger/logger.interface";
import { Container, ContainerModule, interfaces } from "inversify";
import "reflect-metadata";
import { TYPES } from "./container.types";
import { App } from "../app";
import { IExceptionFilter } from "../errors/exceptonFilter.interface";
import { ExceptionFilter } from "../errors/exceptionFilter";
import { IUserController } from "../user/user.controller.interface";
import { IPostController } from "../post/post.controller.interface";
import { PostController } from "../post/post.controller";
import { CommentController } from "../comment/comment.controller";
import { MongoService } from "../database/mongo.service";
import { ConfigService } from '../config/config.service';

export const appBinds = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IPostController>(TYPES.PostController).to(PostController);
  bind<IPostController>(TYPES.CommentController).to(CommentController);
  bind<MongoService>(TYPES.MongoService).to(MongoService).inSingletonScope();
  bind<App>(TYPES.App).to(App);
});

export const appContainer = new Container();
appContainer.load(appBinds);
