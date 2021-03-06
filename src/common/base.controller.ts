import { injectable } from "inversify";
import "reflect-metadata";

import { IRoute } from "./route.interface";
import { ILogger } from "./../logger/logger.interface";
import { Router } from "express";

@injectable()
export abstract class BaseController {
  private readonly _router: Router;
  protected logger: ILogger;

  constructor(logger: ILogger) {
    this._router = Router();
    this.logger = logger;
  }

  get router(): Router {
    return this._router;
  }

  protected bindRoutes(routes: IRoute[]): void {
    for (const route of routes) {
      this.logger.info(
        `route ${route.path}, with method ${route.method} binged`
      );
      const middlewares = route.middlewares.map((m) => m.execute.bind(m));
      const handler = route.func.bind(this);
      const pipeline = middlewares ? [...middlewares, handler] : handler;
      this.router[route.method](route.path, pipeline);
    }
  }
}
