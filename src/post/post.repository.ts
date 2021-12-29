import { injectable } from "inversify";
import "reflect-metadata";
import { PostDocument, PostModel } from "../database/models/post";

import { PostCreateDto } from "./dto/post-create.dto";
import { PostDeleteDto } from "./dto/post-delete.dto";
import { PostGetDto } from "./dto/post-get.dto";
import { PostUpdateDto } from "./dto/post-update.dto";
import { Post } from "./post.entity";
import { IPostRepository } from "./post.repository.interface";

@injectable()
export class PostRepository implements IPostRepository {
  async get(dto: PostGetDto): Promise<PostDocument | null> {
    const neededPost = await PostModel.findOne({
      id: dto.id,
    }).populate("author", ["name", "email"]);

    if (!neededPost) {
      return null;
    }

    return neededPost;
  }

  async update(dto: PostUpdateDto): Promise<PostDocument | null> {
    const { content, id } = dto;

    return await PostModel.findOneAndUpdate({ id }, { content });
  }

  async create(dto: PostCreateDto, user: string): Promise<PostDocument> {
    const post = new Post(user, dto.content);
    const createdPost = await PostModel.create({
      author: post.author,
      content: post.content,
    });

    return createdPost;
  }

  async delete(dto: PostDeleteDto): Promise<PostDocument | null> {
    return await PostModel.findOneAndDelete({ id: dto.id });
  }
}
