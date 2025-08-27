import express, { Request, Response } from "express";
const app = express();
const port = 5000;
import { body, query, validationResult } from "express-validator";
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const calendarRoutes = require("./routes/calendar");
import { connectToDb } from "./config/db";
require("dotenv").config();

// app.get("/products", (req: Request, res: Response) => {
//   const category = req.query.category;
//   const sortBy = req.query.sortBy;

//   console.log(category, sortBy);
//   if (!category && !sortBy) {
//     res.send({
//       id: "something",
//       message: "hellow",
//     });
//   }
//   res.send({
//     category: category,
//     sortBy: sortBy,
//   });
// });
app.use(express.json());
connectToDb();
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/calendar", calendarRoutes);

app.get("/hello", query("person").notEmpty(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    return res.send(`Hello, ${req.query.person}!`);
  }

  res.send({ errors: result.array() });
});

app.post(
  "/newsletter",
  // For the `email` field in `req.body`...
  body("email").trim().isEmail().withMessage("Please enter a valid email"),
  (req, res) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
      return res.send(`Thank you for subscribing, ${req.body.email}!`);
    }

    res.status(400).json({ errors: result.array() });
  }
);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
