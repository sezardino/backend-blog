import "reflect-metadata";
import { App } from "./app";
import { appContainer } from "./container/container";
import { TYPES } from "./container/container.types";

const bootstrap = (): void => {
  const app = appContainer.get<App>(TYPES.App);
  app.init();
};

bootstrap();
