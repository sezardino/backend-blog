import { injectable } from "inversify";
import "reflect-metadata";

import { UserDocument, UserModel } from "./../database/models/user";
import { User } from "./user.entity";
import { IUserRepository } from "./user.repository.interface";

@injectable()
export class UserRepository implements IUserRepository {
  async create(data: User): Promise<UserDocument> {
    const { name, email, password } = data;
    const user = await UserModel.create({ name, email, password });

    return user;
  }

  async find(email: string): Promise<UserDocument | null> {
    const user = await UserModel.findOne({ email });

    return user;
  }
}
