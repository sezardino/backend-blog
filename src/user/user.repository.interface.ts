import { UserLoginDto } from "./dto/user-login.dto";

export interface IUserRepository {
  create: (data: UserLoginDto) => Promise<void>;
}
