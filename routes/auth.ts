import express, { Request, Response } from "express";
import {
  Login,
  Register,
  forgotPassword,
  setPassword,
} from "../controllers/AuthController";
import { authenticateToken } from "../Middleware/authMiddleware";
import validate from "../config/validation";
import { body } from "express-validator";
const router = express.Router();

router
  .route("/")
  .post(
    validate([
      body("email").isEmail().withMessage("Please enter a valid email address"),
    ]),
    Login
  );

router.route("/register").post(Register);
router.route("/set-password").put(setPassword);
router.route("/forgot-password").post(forgotPassword);

module.exports = router;
