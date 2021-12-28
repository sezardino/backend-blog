import { UserDocument } from "../database/models/user";
import { User } from "./user.entity";

export interface IUserRepository {
  create: (user: User) => Promise<UserDocument>;
  find: (email: string) => Promise<UserDocument | null>;
}
