import { UserRepository } from "./../user/user.repository";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { TYPES } from "../container/container.types";
import { PostDocument } from "../database/models/post";

import { PostCreateDto } from "./dto/post-create.dto";
import { PostDeleteDto } from "./dto/post-delete.dto";
import { PostGetDto } from "./dto/post-get.dto";
import { PostUpdateDto } from "./dto/post-update.dto";
import { IPostRepository } from "./post.repository.interface";
import { IPostService } from "./post.service.interface";
import { IUserRepository } from "../user/user.repository.interface";

@injectable()
export class PostService implements IPostService {
  constructor(
    @inject(TYPES.PostRepository) private postRepository: IPostRepository,
    @inject(TYPES.UserRepository) private UserRepository: IUserRepository
  ) {}

  async get(dto: PostGetDto): Promise<PostDocument | null> {
    const neededPost = await this.postRepository.get(dto);

    return neededPost;
  }

  async update(dto: PostUpdateDto): Promise<PostDocument | null> {
    const updatedPost = await this.postRepository.update(dto);

    return updatedPost;
  }

  async create(dto: PostCreateDto, user: string): Promise<PostDocument | null> {
    const neededUser = await this.UserRepository.find(user);

    if (!neededUser) {
      return null;
    }

    return await this.postRepository.create(dto, neededUser.id);
  }

  async delete(dto: PostDeleteDto): Promise<PostDocument | null> {
    return null;
  }
}
