import { Request, Response } from "express";

// tasks
export const CreateTask = (req: Request, res: Response) => {
  // const {title, description, status, date, repeat} = req.body
  // // create task
  // if(date)
  // {
  //     const calendar = await Calendar.create({
  //     })
  // }
};

export const MarkTaskAsDone = (req: Request, res: Response) => {};

export const UpdateTask = (req: Request, res: Response) => {};

export const DeleteTask = (req: Request, res: Response) => {};

//lists

export const CreateList = (req: Request, res: Response) => {};

export const GetAllLists = (req: Request, res: Response) => {};

export const UpdateList = (req: Request, res: Response) => {};

export const DeleteList = (req: Request, res: Response) => {};
