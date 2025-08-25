import { Request, Response } from "express";
import { Users } from "../Models/Users";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const Login = async (req: any, res: Response) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (user == null) {
    return res.status(400).send({
      message: "User not found",
    });
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(400).send({
      message: "Invalid password",
    });
  }
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "10minutes",
    }
  );
  res.send({
    token,
    message: "User logged in successfully",
  });
};

export const Register = async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password, username, gender, dateOfBirth } = req.body;
  const user = await Users.create({
    email,
    password,
    username,
    gender,
    dateOfBirth,
  });
  console.log("Registering user with email:", email);
  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "10minutes",
    }
  );
  res.send({
    email: user.email,
    token: token,
    password: user.password,
    message: "User registered successfully",
  });
};
