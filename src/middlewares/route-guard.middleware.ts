import { Request, Response, NextFunction } from "express";
import { HTTPError } from "../errors/httpError.class";
import { IMiddleware } from "./middleware.interface";

export class RouteGuard implements IMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
      return next();
    } else {
      return next(
        new HTTPError(422, "You don't have permission for this action")
      );
    }
  }
}
