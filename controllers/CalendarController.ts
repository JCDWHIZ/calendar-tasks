import { Request, Response } from "express";

export const GetAllProducts = (req: Request, res: Response) => {
  console.log("getting all products");
  res.send("<h1>Track suits</h1>");
};

export const GetProduct = (req: Request, res: Response) => {
  console.log("getting  product by id");
  const id = req.params.id;
  res.send({
    id: id,
    name: "Track suit",
  });
};
