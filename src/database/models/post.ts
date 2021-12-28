import { Document } from "mongoose";
import { UserDocument } from "./user";

export interface IPost {
  author: UserDocument["_id"];
  content: string;
}

export interface PostDocument extends IPost, Document {}
