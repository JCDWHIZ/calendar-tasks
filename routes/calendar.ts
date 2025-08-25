import express, { Request, Response } from "express";
import {
  CreateEvent,
  DeleteEvent,
  GetEventDetails,
  UpdateEvent,
} from "../controllers/CalendarController";
import { authenticateToken } from "../Middleware/authMiddleware";
const router = express.Router();

router.route("/").post(authenticateToken, CreateEvent);
router.route("/").get(authenticateToken, GetEventDetails);
router.route("/:id").delete(authenticateToken, DeleteEvent);
router.route("/:id").put(authenticateToken, UpdateEvent);

module.exports = router;
