import { ILogger } from "./../logger/logger.interface";
import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { sign } from "jsonwebtoken";

import { TYPES } from "../container/container.types";
import { IUserController } from "./user.controller.interface";
import { BaseController } from "../common/base.controller";
import { IUserService } from "./user.service.interface";
import { UserRegisterDto } from "./dto/user-register.dto";
import { UserLoginDto } from "./dto/user-login.dto";
import { IConfigService } from "../config/config.interface";
import { RouteGuard } from "../middlewares/route-guard.middleware";
import { UserDocument } from "../database/models/user";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.Logger) logger: ILogger,
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.ConfigService) private configService: IConfigService
  ) {
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
        middlewares: [new RouteGuard()],
      },
    ]);
  }

  sign(email: string): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(
        { email, iat: Date.now() },
        this.configService.get("JWT_SECRET"),
        {
          algorithm: "HS256",
        },
        (err, token) => {
          if (err) {
            return reject(err);
          }

          resolve(token as string);
        }
      );
    });
  }

  async register(
    req: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>>> {
    const result = await this.userService.create(req.body);

    if (!result) {
      return res.status(401).send({ message: "User already exist" });
    }

    const token = this.sign(req.body.email);

    return res
      .status(201)
      .send({ message: "User create successfully", user: token });
  }

  async login(
    req: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>>> {
    const result = await this.userService.validate(req.body);

    if (typeof result === "boolean") {
      return res.status(401).send({ message: "Password mismatch" });
    }

    if (!result) {
      return res.status(401).send({ message: "Wrong data" });
    }

    const token = await this.sign(req.body.email);

    return res.status(200).send({ message: "logged correctly", token });
  }

  async info(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>>> {
    const user = await this.userService.find(req.user);

    if (!user) {
      return res.status(401).send({ message: "Wrong data" });
    }

    return res.send({ name: user.name, email: user.email, posts: user.posts });
  }
}
