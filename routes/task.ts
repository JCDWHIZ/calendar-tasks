import express, { Request, Response } from "express";
import { authenticateToken } from "../Middleware/authMiddleware";
import {
  CreateList,
  CreateTask,
  DeleteList,
  GetAllLists,
  MarkTaskAsDone,
  UpdateList,
  UpdateTask,
} from "../controllers/TasksController";
const router = express.Router();

// tasks
router.route("/").post(authenticateToken, CreateTask);
router.route("/mark/:id").put(authenticateToken, MarkTaskAsDone);
router.route("/:id").put(authenticateToken, UpdateTask);

// lists
router.route("/list").post(authenticateToken, CreateList);
router.route("/lists").get(authenticateToken, GetAllLists);
router.route("/lists/:id").put(authenticateToken, UpdateList);
router.route("/lists/:id").delete(authenticateToken, DeleteList);

module.exports = router;
