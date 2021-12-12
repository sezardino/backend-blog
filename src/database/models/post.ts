import { Document } from "mongoose";
import { CommentDocument } from "./comment";
import { UserDocument } from "./user";

export interface IPost {
  author: UserDocument["_id"];
  rating: number;
  comments: [CommentDocument["_id"]];
  content: string;
}

export interface PostDocument extends IPost, Document {}
