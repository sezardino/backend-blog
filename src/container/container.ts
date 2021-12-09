import { LoggerService } from "../logger/logger.service";
import { ILogger } from "../logger/logger.interface";
import { Container, ContainerModule, interfaces } from "inversify";
import "reflect-metadata";
import { TYPES } from "./container.types";
import { App } from "../app";

export const appBinds = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.Logger)
    .to(LoggerService)
    .inSingletonScope();
  bind<App>(TYPES.App).to(App);
});

export const appContainer = new Container();
appContainer.load(appBinds);
