import express, { Request, Response } from "express";
import { Login, Register } from "../controllers/AuthController";
import { authenticateToken } from "../Middleware/authMiddleware";
const router = express.Router();

router.route("/").post(Login);

router.route("/register").post(Register);

module.exports = router;
