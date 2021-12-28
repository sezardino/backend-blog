import { Document, model, Schema, Types } from "mongoose";
import { UserDocument } from "./user";

export interface IPost {
  author: UserDocument["_id"];
  content: string;
}

export interface PostDocument extends IPost, Document {}

export const PostSchema = new Schema<PostDocument>(
  {
    author: { type: Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export const PostModel = model<PostDocument>("Post", PostSchema);
