import express from "express";
import { updateUser, deleteUser, getUserListings } from "../Controllers/userController.js";
import { verifyToken } from "../Utils/verifyUser.js";

const router = express.Router();

router.route("/update/:id").post(verifyToken, updateUser);

router.route("/delete/:id").delete(verifyToken, deleteUser);

router.route('/listings/:id').get(verifyToken,getUserListings)

export default router;
