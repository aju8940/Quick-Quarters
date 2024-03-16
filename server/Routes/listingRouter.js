import Express from "express";
const router = Express.Router();
import {createListing} from '../Controllers/listingController.js'
import { verifyToken } from "../Utils/verifyUser.js";

router.route('/create').post(verifyToken,createListing)

export default router;
