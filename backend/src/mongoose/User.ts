import { Schema, model } from "mongoose";

export type UserType = {
  id: string;
  firstname: string;
  username: string;
  password: string;
};

const userSchema = new Schema<UserType>({
  firstname: String,
  username: String,
  password: String,
});

const userModel = model<UserType>("users", userSchema);

export default userModel;
