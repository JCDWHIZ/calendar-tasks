import { Request, Response } from "express";
import { Tasks, tasksStatus } from "../Models/Task";
import { Calendar, calendarType } from "../Models/Calendar";
import { TaskList } from "../Models/Lists";

// tasks
export const CreateTask = async (req: Request, res: Response) => {
  const { title, description, date, repeat, listId } = req.body;

  const task = await Tasks.create({
    title,
    description,
    status: tasksStatus.PENDING,
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
      type: calendarType.tasks,
    });
  }

  return res.status(201).json({
    message: "Task created succesfully",
  });
};

export const MarkTaskAsDone = (req: Request, res: Response) => {};

export const UpdateTask = (req: Request, res: Response) => {};

export const DeleteTask = (req: Request, res: Response) => {};

export const ReassignTaskToList = async (req: Request, res: Response) => {
  const { taskId, listId } = req.body;

  const task = await Tasks.findOne({ _id: taskId });
  if (task == null) {
    return res.status(400).json({
      message: "Task not found",
    });
  }

  console.log("after task found");
  const list = await TaskList.findOne({ _id: listId });
  if (list == null) {
    return res.status(400).json({
      message: "List not found",
    });
  }
  console.log("after tasklist");

  list.tasks.push(task._id);
  console.log("after tasklist task added");
  await list.save();
  console.log("after tasklist saved");

  return res.status(200).json({
    message: "Task reassigned succesfully",
  });
};
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

export const GetAllLists = async (req: Request, res: Response) => {
  const ListWithTask = await TaskList.find().populate("tasks");
  return res.status(200).json({
    message: "Lists fetched succesfully",
    data: ListWithTask,
  });
};

export const UpdateList = (req: Request, res: Response) => {};

export const DeleteList = (req: Request, res: Response) => {};
