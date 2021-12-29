import { Schema, model, Document, Types } from "mongoose";
import { PostDocument } from "./post";

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface UserDocument extends IUser, Document {}

export const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = model<UserDocument>("User", UserSchema);
