import { injectable, inject } from "inversify";
import "reflect-metadata";
import { TYPES } from "../container/container.types";

import { User } from "./user.entity";
import { UserDocument } from "../database/models/user";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { IUserRepository } from "./user.repository.interface";
import { IUserService } from "./user.service.interface";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: IUserRepository
  ) {}

  async find(email: string): Promise<UserDocument | null> {
    return await this.userRepository.find(email);
  }

  async create(dto: UserRegisterDto): Promise<UserDocument | null> {
    const { email, name, password } = dto;
    const neededUser = await this.find(email);

    if (neededUser) {
      return null;
    }

    const user = new User(name, email);
    await user.setPassword(password);
    const createdUser = this.userRepository.create(user);

    return createdUser;
  }

  async validate(dto: UserLoginDto): Promise<UserDocument | null | false> {
    const neededUser = await this.find(dto.email);

    if (!neededUser) {
      return null;
    }

    const passwordMatch = await User.comparePass(
      dto.password,
      neededUser.password
    );

    if (!passwordMatch) {
      return false;
    }

    return neededUser;
  }
}
