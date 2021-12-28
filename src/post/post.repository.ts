import { PostCreateDto } from "./dto/post-create.dto";
import { PostDeleteDto } from "./dto/post-delete.dto";
import { PostGetDto } from "./dto/post-get.dto";
import { PostUpdateDto } from "./dto/post-update.dto";
import { IPostRepository } from "./post.repository.interface";

export class PostRepository implements IPostRepository {
  async get(dto: PostGetDto): Promise<void> {
    console.log(1);
  }
  async update(dto: PostUpdateDto): Promise<void> {
    console.log(2);
  }
  async create(dto: PostCreateDto): Promise<void> {
    console.log(3);
  }
  async delete(dto: PostDeleteDto): Promise<void> {
    console.log(4);
  }
}
