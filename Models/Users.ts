import mongoose, { Schema } from "mongoose";

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

export const Users = mongoose.model("Users", userSchema);
