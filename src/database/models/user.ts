import { Schema, model, Document, Types } from "mongoose";
import { CommentDocument } from "./comment";
import { PostDocument } from "./post";

export interface IUser {
  posts: [PostDocument["_id"]] | [];
  name: string;
  email: string;
  password: string;
  comments: [CommentDocument["_id"]] | [];
  rating: number;
}

export interface UserDocument extends IUser, Document {}

export const UserSchema = new Schema<UserDocument>(
  {
    posts: { type: [{ type: Types.ObjectId, ref: "Post" }], default: [] },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    comments: [{ type: Types.ObjectId, ref: "Comment", default: [] }],
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>("User", UserSchema);
