import { RouteGuard } from "./../middlewares/route-guard.middleware";
import { inject, injectable } from "inversify";
import "reflect-metadata";

import { Request, Response, NextFunction } from "express";
import { TYPES } from "../container/container.types";
import { ILogger } from "../logger/logger.interface";
import { BaseController } from "../common/base.controller";
import { IPostController } from "./post.controller.interface";
import { IPostService } from "./post.service.interface";
import { PostGetDto } from "./dto/post-get.dto";
import { PostUpdateDto } from "./dto/post-update.dto";
import { PostCreateDto } from "./dto/post-create.dto";
import { PostDeleteDto } from "./dto/post-delete.dto";

@injectable()
export class PostController extends BaseController implements IPostController {
  constructor(
    @inject(TYPES.Logger) logger: ILogger,
    @inject(TYPES.PostService) private postService: IPostService
  ) {
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

  async get(req: Request<{}, {}, PostGetDto>, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
    const neededPost = await this.postService.get(req.body);

    if(!neededPost) {
      return res.send({message:'Post not found'});
    }

    return res.send(neededPost);
  }

  async update(req: Request<{}, {}, PostUpdateDto>, res: Response, next: NextFunction): Promise<void> {
    this.postService.update(req.body);
    res.send("update");
  }

  async create(req: Request<{}, {}, PostCreateDto>, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> {
    const createdPost = await this.postService.create(req.body, req.user);

    if(!createdPost) {
      return res.send("User not found");
    }

    return res.send({createdPost});
  }

  async delete(req: Request<{}, {}, PostDeleteDto>, res: Response, next: NextFunction): Promise<void> {
    this.postService.delete(req.body);
    res.send("delete");
  }
}
