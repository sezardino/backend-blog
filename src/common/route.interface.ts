import { NextFunction, Request, Response, Router } from "express";
import { IMiddleware } from "../middlewares/middleware.interface";

export interface IRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, "delete" | "get" | "post" | "put" | "patch">;
  middlewares: IMiddleware[];
}
