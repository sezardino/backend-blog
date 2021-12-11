import { IConfigService } from "./../config/config.interface";
import { ILogger } from "./../logger/logger.interface";
import { TYPES } from "./../container/container.types";
import { MongoClient } from "mongodb";
import { connect, disconnect } from "mongoose";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class MongoService {
  constructor(
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.ConfigService) private config: IConfigService
  ) {}

  async connect(): Promise<void> {
    try {
      await connect(this.config.get("MONGODB_URL"));
      this.logger.info("[MongoService]: connected to MongoDB");
    } catch (error) {
      this.logger.fatal(error as Error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await disconnect();
      this.logger.info("[MongoService]: disconnect from MongoDB");
    } catch (error) {
      this.logger.fatal(error as Error);
    }
  }
}
