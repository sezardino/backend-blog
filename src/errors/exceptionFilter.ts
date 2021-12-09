import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { TYPES } from "../container/container.types";
import { LoggerService } from "../logger/logger.service";
import { IExceptionFilter } from "./exceptonFilter.interface";
import { HTTPError } from "./httpError.class";

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.Logger) private logger: LoggerService) {
    this.logger.info("[ExceptionFilter]: connected successfully");
  }

  catch(
    err: Error | HTTPError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (err instanceof HTTPError) {
      this.logger.error(
        `[${err.statusCode}] Error ${err.message}: ${
          err.context ? err.context : ""
        }`
      );
      res.status(err.statusCode).send({ err: err.message });
    } else {
      res.status(500).send({ err: err.message });
    }
  }
}
