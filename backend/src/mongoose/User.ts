import { Schema, model } from "mongoose";

interface User {
  firstname: string;
  username: string;
  password: string;
}

const userSchema = new Schema<User>({
  firstname: String,
  username: String,
  password: String,
});

const userModel = model<User>('users', userSchema);

export default userModel;