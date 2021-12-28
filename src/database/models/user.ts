import { Schema, model, Document, Types } from "mongoose";
import { PostDocument } from "./post";

export interface IUser {
  posts: [PostDocument["_id"]] | [];
  name: string;
  email: string;
  password: string;
  rating: number;
}

export interface UserDocument extends IUser, Document {}

export const UserSchema = new Schema<UserDocument>(
  {
    posts: { type: [{ type: Types.ObjectId, ref: "Post" }], default: [] },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>("User", UserSchema);
