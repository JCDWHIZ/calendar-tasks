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

export const GetEventDetails = (req: Request, res: Response) => {};

export const DeleteEvent = (req: Request, res: Response) => {};

export const UpdateEvent = (req: Request, res: Response) => {};
