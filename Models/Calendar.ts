import mongoose, { Schema } from "mongoose";

interface calendar {
  title: string;
  location: string;
  description: string;
  type: string;
  date: Date;
}

export enum calendarType {
  event,
  tasks,
}

const calendarSchema: Schema<calendar> = new Schema({
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
  location: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    enum: calendarType,
    default: calendarType.event.toLocaleString(),
  },
  date: {
    type: Date,
    required: true,
  },
  //   list: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tasks" }],
});

export const Calendar = mongoose.model("Calendar", calendarSchema);
