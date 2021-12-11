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

export const appBinds = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.Logger)
    .to(LoggerService)
    .inSingletonScope();
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<App>(TYPES.App).to(App);
});

export const appContainer = new Container();
appContainer.load(appBinds);
