import { Request, Response } from "express";
import { Tasks } from "../Models/Task";
import { Calendar } from "../Models/Calendar";
import { TaskList } from "../Models/Lists";

// tasks
export const CreateTask = async (req: Request, res: Response) => {
  const { title, description, status, date, repeat, listId } = req.body;

  const task = await Tasks.create({
    title,
    description,
    status,
    repeat,
    date,
  });

  const list = await TaskList.findOne({ _id: listId });
  if (list == null) {
    return res.status(400).json({
      message: "List not found",
    });
  }

  list.tasks.push(task._id);
  await list.save();
  if (date) {
    const calendar = await Calendar.create({
      title,
      description,
      date,
      type: "task",
    });
  }

  return res.status(201).json({
    message: "Task created succesfully",
  });
};

export const MarkTaskAsDone = (req: Request, res: Response) => {};

export const UpdateTask = (req: Request, res: Response) => {};

export const DeleteTask = (req: Request, res: Response) => {};

//lists

export const CreateList = async (req: Request, res: Response) => {
  const { title } = req.body;

  const list = await TaskList.create({
    title,
  });

  return res.status(201).json({
    message: "List created succesfully",
    data: {
      id: list._id,
      title: list.title,
    },
  });
};

export const GetAllLists = (req: Request, res: Response) => {};

export const UpdateList = (req: Request, res: Response) => {};

export const DeleteList = (req: Request, res: Response) => {};
