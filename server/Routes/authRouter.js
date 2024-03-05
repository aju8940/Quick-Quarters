import express from "express";
import { SignUp } from "../Controllers/authController.js";

const router = express.Router();

router.route("/sign-up").post(SignUp);

export default router;
