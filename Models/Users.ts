import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

interface user {
  username: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
  status: string;
  list: mongoose.Types.ObjectId[];
}

enum tasksStatus {
  PENDING,
  COMPLETED,
}

const userSchema: Schema<user> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9_]{3,30}$/,
  },
  email: String,
  password: String,
  gender: String,
  dateOfBirth: String,
  status: {
    type: String,
    enum: tasksStatus,
    default: tasksStatus.PENDING.toLocaleString(),
  },
  list: [{ type: mongoose.Schema.Types.ObjectId, ref: "TaskList" }],
});

userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

export const Users = mongoose.model("Users", userSchema);
