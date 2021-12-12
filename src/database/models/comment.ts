import { Document } from "mongoose";
import { PostDocument } from "./post";
import { UserDocument } from "./user";

export interface IComment {
  for: PostDocument["_id"];
  body: string;
  author: UserDocument["_id"];
}

export interface CommentDocument extends IComment, Document {}
