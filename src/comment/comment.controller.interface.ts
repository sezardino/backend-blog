import { Request, Response, NextFunction } from "express";

export interface ICommentController {
  get: (req: Request, res: Response, next: NextFunction) => void;
  update: (req: Request, res: Response, next: NextFunction) => void;
  create: (req: Request, res: Response, next: NextFunction) => void;
  delete: (req: Request, res: Response, next: NextFunction) => void;
}
