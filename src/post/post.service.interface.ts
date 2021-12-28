import { PostCreateDto } from "./dto/post-create.dto";
import { PostDeleteDto } from "./dto/post-delete.dto";
import { PostGetDto } from "./dto/post-get.dto";
import { PostUpdateDto } from "./dto/post-update.dto";

export interface IPostService {
  get: (dto: PostGetDto) => Promise<void>;
  update: (dto: PostUpdateDto) => Promise<void>;
  create: (dto: PostCreateDto) => Promise<void>;
  delete: (dto: PostDeleteDto) => Promise<void>;
}
