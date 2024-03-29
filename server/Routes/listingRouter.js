import Express from "express";
const router = Express.Router();
import {createListing ,deleteListing, updateListing ,getListing,getAllListings} from '../Controllers/listingController.js'
import { verifyToken } from "../Utils/verifyUser.js";

router.route('/create').post(verifyToken,createListing)

router.route('/delete/:id').delete(verifyToken,deleteListing)

router.route('/update/:id').post(verifyToken,updateListing)

router.route('/get/:id').get(getListing)

router.route('/get-listings').get(getAllListings)

export default router;
