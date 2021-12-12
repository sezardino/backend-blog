import { injectable } from "inversify";
import "reflect-metadata";

import { UserDocument } from "../database/models/user";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { IUserService } from "./user.service.interface";

@injectable()
export class UserService implements IUserService {
  async find(email: string): Promise<UserDocument | null> {
    return null;
  }

  async create(dto: UserRegisterDto): Promise<UserDocument | null> {
    return null;
  }

  async validate(dto: UserLoginDto): Promise<UserDocument | null | false> {
    return null;
  }
}
