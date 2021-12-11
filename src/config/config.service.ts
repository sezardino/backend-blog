import { inject, injectable } from "inversify";
import { config, DotenvParseOutput } from "dotenv";
import "reflect-metadata";

import { TYPES } from "../container/container.types";
import { ILogger } from "./../logger/logger.interface";
import { IConfigService } from "./config.interface";

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;

  constructor(@inject(TYPES.Logger) private logger: ILogger) {
    const result = config();

    if (result.error) {
      this.logger.error("[ConfigService]: problem with connection with dotenv");
    }

    if (result.parsed) {
      this.config = result.parsed;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
