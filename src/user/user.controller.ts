import { ILogger } from "./../logger/logger.interface";
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../container/container.types";

import { IUserController } from "./user.controller.interface";
import { BaseController } from "../common/base.controller";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.Logger) logger: ILogger) {
    super(logger);
    this.bindRoutes([
      {
        method: "post",
        path: "/register",
        func: this.register,
        middlewares: [],
      },
      {
        method: "post",
        path: "/login",
        func: this.login,
        middlewares: [],
      },
      {
        method: "get",
        path: "/info",
        func: this.info,
        middlewares: [],
      },
    ]);
  }

  register(req: Request, res: Response, next: NextFunction): void {
    res.send("register");
  }

  login(req: Request, res: Response, next: NextFunction): void {
    res.send("login");
  }

  info(req: Request, res: Response, next: NextFunction): void {
    res.send("info");
  }
}
