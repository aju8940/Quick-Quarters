import Listing from '../Models/listingModel.js'
import { errorHandler } from '../Utils/errorHandler.js'

export const createListing = async(req,res,next)=>{
    try {
        const listing =await Listing.create(req.body)
        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const deleteListing =async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id)
    if(!listing) {
        return next(errorHandler(404,'Listing not found'))
    }
    if (req.user.id!==listing.userRef) {
        return next(errorHandler(401,'You can delete only your listings'))
    }
    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json('Listing Deleted Successfully')
    } catch (error) {
        next(error)
    }
}

export const updateListing = async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id)
    if(!listing) {
        return next(errorHandler(404,'No Listing Found'))
    }
    if (req.user.id !== listing.userRef) {
        return next(errorHandler(401,'You can only edit your own listing..!!!'))
    }
    try {
        const data = await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.status(200).json('Successfully Updated')
    } catch (error) {
        next(error)
    }
}

export const getListing=async(req,res,next)=>{
    try {
        const listing = await Listing.findById(req.params.id)
        if(!listing) {
            return next(errorHandler(404,'Listing not found'))
        }
        res.status(200).json(listing)
    } catch (error) {
        next(error)
    }
}