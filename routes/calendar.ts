import express, { Request, Response } from "express";
import {
  CreateEvent,
  DeleteEvent,
  GetEventDetails,
  UpdateEvent,
  PatchUpdateEvent,
} from "../controllers/CalendarController";
import { authenticateToken } from "../Middleware/authMiddleware";
import validate from "../config/validation";
import { body } from "express-validator";
const router = express.Router();

router
  .route("/")
  .post(
    authenticateToken,
    validate([body("date").isDate().withMessage("Date input is not valid")]),
    CreateEvent
  );
router.route("/").get(authenticateToken, GetEventDetails);
router.route("/:id").delete(authenticateToken, DeleteEvent);
router.route("/:id").put(authenticateToken, UpdateEvent);
router.route("/:id").patch(authenticateToken, PatchUpdateEvent);

module.exports = router;
