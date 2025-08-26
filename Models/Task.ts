import mongoose, { Schema } from "mongoose";

interface Task {
  title: string;
  description: string;
  status: string;
  date: Date;
  repeat: boolean;
  starred: boolean;
}

enum tasksStatus {
  PENDING,
  COMPLETED,
}

const taskSchema: Schema<Task> = new Schema({
  title: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9_ ]{3,100}$/,
  },
  description: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9_ ]{10,500}$/,
  },
  status: {
    type: String,
    enum: tasksStatus,
    default: tasksStatus.PENDING.toLocaleString(),
  },
  date: {
    type: Date,
    required: false,
  },
  repeat: {
    type: Boolean,
    default: false,
  },
  starred: {
    type: Boolean,
    default: false,
  },
});

export const Tasks = mongoose.model("Tasks", taskSchema);
