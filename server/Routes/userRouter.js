import express from "express";
import { updateUser, Homepage, deleteUser } from "../Controllers/userController.js";
import { verifyToken } from "../Utils/verifyUser.js";

const router = express.Router();

router.route("/").get(Homepage);

router.route("/update/:id").post(verifyToken, updateUser);

router.route("/delete/:id").delete(verifyToken, deleteUser);

export default router;
