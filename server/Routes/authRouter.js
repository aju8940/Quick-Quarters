import express from "express";
import { googleAuth,signIn, signUp } from "../Controllers/authController.js";

const router = express.Router();

router.route("/sign-up").post(signUp);

router.route("/sign-in").post(signIn);

router.route("/google").post(googleAuth);

export default router;
