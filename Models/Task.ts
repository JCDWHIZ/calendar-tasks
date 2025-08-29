import mongoose, { Schema, Types } from "mongoose";

interface Task {
  title: string;
  description: string;
  status: string;
  date: Date;
  repeat: boolean;
  starred: boolean;
  listId: Types.ObjectId;
}

export enum tasksStatus {
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
  listId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TaskList",
  },
});

export const Tasks = mongoose.model("Tasks", taskSchema);
