import { inject, injectable } from "inversify";
import "reflect-metadata";

import { Request, Response, NextFunction } from "express";
import { TYPES } from "../container/container.types";
import { ILogger } from "../logger/logger.interface";
import { BaseController } from "../common/base.controller";
import { ICommentController } from "./comment.controller.interface";

@injectable()
export class CommentController extends BaseController implements ICommentController {
  constructor(@inject(TYPES.Logger) logger: ILogger) {
    super(logger);

    this.bindRoutes([
      {
        method: "get",
        path: "/get",
        func: this.get,
        middlewares: [],
      },
      {
        method: "patch",
        path: "/update",
        func: this.update,
        middlewares: [],
      },
      {
        method: "post",
        path: "/create",
        func: this.create,
        middlewares: [],
      },
      {
        method: "delete",
        path: "/delete",
        func: this.delete,
        middlewares: [],
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
