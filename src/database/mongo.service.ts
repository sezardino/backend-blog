import { IConfigService } from "./../config/config.interface";
import { ILogger } from "./../logger/logger.interface";
import { TYPES } from "./../container/container.types";
import { MongoClient } from "mongodb";
import { inject, injectable } from "inversify";
import "reflect-metadata";

@injectable()
export class MongoService {
  private client: MongoClient;

  constructor(
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.ConfigService) private config: IConfigService
  ) {
    this.client = new MongoClient(this.config.get("MONGODB_URL"));
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.logger.info("[MongoService]: connected to MongoDB");
    } catch (error) {
      this.logger.fatal(error as Error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.client.close();
      this.logger.info("[MongoService]: disconnect from MongoDB");
    } catch (error) {
      this.logger.fatal(error as Error);
    }
  }
}
