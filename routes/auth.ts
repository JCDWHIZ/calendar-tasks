import express, { Request, Response } from "express";
import { Login, Register } from "../controllers/AuthController";
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

module.exports = router;
