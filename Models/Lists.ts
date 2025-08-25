import mongoose, { Schema, model } from "mongoose";

interface calendar {
  title: string;
  tasks: mongoose.Types.ObjectId[];
}

const listSchema: Schema<calendar> = new Schema({
  title: {
    type: String,
    required: true,
    match: /^[a-zA-Z0-9_ ]{3,100}$/,
  },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tasks" }],
});

export const TaskList = model("TaskList", listSchema);
