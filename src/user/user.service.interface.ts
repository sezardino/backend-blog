import { UserDocument } from "../database/models/user";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";

export interface IUserService {
  find: (email: string) => Promise<UserDocument | null>;
  create: (dto: UserRegisterDto) => Promise<UserDocument | null>;
  validate: (dto: UserLoginDto) => Promise<UserDocument | null | false>;
}
