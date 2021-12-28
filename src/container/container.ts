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
import { MongoService } from "../database/mongo.service";
import { ConfigService } from '../config/config.service';
import { IUserService } from '../user/user.service.interface';
import { UserService } from '../user/user.service';
import { IUserRepository } from '../user/user.repository.interface';
import { UserRepository } from '../user/user.repository';
import { IPostService } from '../post/post.service.interface';
import { IPostRepository } from '../post/post.repository.interface';
import { PostRepository } from '../post/post.repository';
import { PostService } from '../post/post.service';

export const appBinds = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.Logger).to(LoggerService).inSingletonScope();
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<MongoService>(TYPES.MongoService).to(MongoService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IPostController>(TYPES.PostController).to(PostController);
  bind<IUserService>(TYPES.UserService).to(UserService);
  bind<IUserRepository>(TYPES.UserRepository).to(UserRepository);
  bind<IPostService>(TYPES.PostService).to(PostService);
  bind<IPostRepository>(TYPES.PostRepository).to(PostRepository);
  bind<App>(TYPES.App).to(App);
});

export const appContainer = new Container();
appContainer.load(appBinds);
