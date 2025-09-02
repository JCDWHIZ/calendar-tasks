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

  task.listId = list._id;
  list.tasks.push(task._id);

  await task.save();
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

export const MarkTaskAsDone = async (req: Request, res: Response) => {
  const { id } = req.params;

  const task = await Tasks.findById(id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.status = tasksStatus.COMPLETED.toLocaleString();

  return res.status(200).json({
    message: "Task Done",
  });
};

export const UpdateTask = (req: Request, res: Response) => {};

export const DeleteTask = (req: Request, res: Response) => {};

export const ReassignTaskToList = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const { listId } = req.body;

  // Find the task
  const task = await Tasks.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Find the new list
  const newList = await TaskList.findById(listId);
  if (!newList) {
    return res.status(404).json({ message: "New list not found" });
  }

  // Find the old list
  const oldList = await TaskList.findById(task.listId);
  if (oldList) {
    oldList.tasks = oldList.tasks.filter(
      (tId: any) => tId.toString() !== task._id.toString()
    );
    await oldList.save();
  }

  // Update the task’s listId
  task.listId = newList._id;
  await task.save();

  // Add task to the new list
  if (!newList.tasks.includes(task._id)) {
    newList.tasks.push(task._id);
    await newList.save();
  }

  return res.status(200).json({ message: "Task reassigned successfully" });

  // use this to study what i did
  // we have an array of different ids but have no idea of what the index in the arrays are
  // let array = ["id1", "id2", "id3"];
  // console.log("this is normal arrya", array); //output: ["id1", "id2", "id3"];
  // this filter will get all ids that is not id2 and set that as the new array value
  // array = array.filter((id: string) => id !== "id2");
  // console.log("this is normal arrya", array); //output: ["id1", "id3"];
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
