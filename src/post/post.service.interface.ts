import { PostDocument } from "../database/models/post";
import { PostCreateDto } from "./dto/post-create.dto";
import { PostDeleteDto } from "./dto/post-delete.dto";
import { PostGetDto } from "./dto/post-get.dto";
import { PostUpdateDto } from "./dto/post-update.dto";

export interface IPostService {
  get: (dto: PostGetDto) => Promise<PostDocument | null>;
  update: (dto: PostUpdateDto) => Promise<PostDocument | null>;
  create: (dto: PostCreateDto, user: string) => Promise<PostDocument | null>;
  delete: (dto: PostDeleteDto) => Promise<PostDocument |null>;
}
