import { Request, Response, NextFunction } from "express";

export interface IPostController {
  get: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
  update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  create: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>>>;
  delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
