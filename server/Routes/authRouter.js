import express from "express";
import { signIn, signUp } from "../Controllers/authController.js";

const router = express.Router();

router.route("/sign-up").post(signUp);

router.route("/sign-in").post(signIn);

export default router;
