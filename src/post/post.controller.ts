import { RouteGuard } from "./../middlewares/route-guard.middleware";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import { Request, Response, NextFunction } from "express";
import { TYPES } from "../container/container.types";
import { ILogger } from "../logger/logger.interface";
import { BaseController } from "../common/base.controller";
import { IPostController } from "./post.controller.interface";

@injectable()
export class PostController extends BaseController implements IPostController {
  constructor(@inject(TYPES.Logger) logger: ILogger) {
    super(logger);

    this.bindRoutes([
      {
        method: "get",
        path: "/get",
        func: this.get,
        middlewares: [new RouteGuard()],
      },
      {
        method: "patch",
        path: "/update",
        func: this.update,
        middlewares: [new RouteGuard()],
      },
      {
        method: "post",
        path: "/create",
        func: this.create,
        middlewares: [new RouteGuard()],
      },
      {
        method: "delete",
        path: "/delete",
        func: this.delete,
        middlewares: [new RouteGuard()],
      },
    ]);
  }

  get(req: Request, res: Response, next: NextFunction): void {
    res.send("get");
  }

  update(req: Request, res: Response, next: NextFunction): void {
    res.send("update");
  }

  create(req: Request, res: Response, next: NextFunction): void {
    res.send("create");
  }

  delete(req: Request, res: Response, next: NextFunction): void {
    res.send("delete");
  }
}
