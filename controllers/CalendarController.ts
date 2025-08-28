import { Request, Response } from "express";
import { Calendar } from "../Models/Calendar";

export const CreateEvent = async (req: Request, res: Response) => {
  const { title, location, description, date, type } = req.body;

  const calendar = await Calendar.create({
    title,
    location,
    description,
    date,
    type,
  });

  res.status(201).json({
    message: "Event created successfully",
    data: calendar,
  });
};

export const GetEventDetails = async (req: Request, res: Response) => {
  const events = await Calendar.find();

  res.status(200).json({
    message: "Events retrieved successfully",
    data: events,
  });
};

export const DeleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Calendar.findOneAndDelete({ _id: id });

  return res.status(200).json({
    message: "Event deleted successfully",
  });
};

export const PatchUpdateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, location, description, date, type } = req.body;

  const event = await Calendar.findOne({ _id: id });
  if (!event) {
    return res.status(404).json({
      message: "Event not found",
    });
  }

  event.title = title ?? event.title;
  event.location = location ?? event.location;
  event.description = description ?? event.description;
  event.date = date ?? event.date;
  event.type = type ?? event.type;

  res.status(200).json({
    message: "Event updated successfully",
    data: event,
  });
};

export const UpdateEvent = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, location, description, date, type } = req.body;

  const event = await Calendar.findByIdAndUpdate(
    id,
    { title, location, description, date, type },
    { new: true }
  );

  if (!event) {
    return res.status(404).json({
      message: "Event not found",
    });
  }
  res.status(200).json({
    message: "Event updated successfully",
    data: event,
  });
};
