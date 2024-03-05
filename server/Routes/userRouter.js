import express from "express";
import { Homepage } from "../Controllers/userController.js";

const router = express.Router()


router.route('/').get(Homepage)


export default router;