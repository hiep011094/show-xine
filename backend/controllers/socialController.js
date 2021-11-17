import { socialModel } from '../models/socialModel.js';
import ErrorHander from "../utils/errorhander.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

// Create Social -- admin
export const createSocial = catchAsyncError(async(req, res, next) => {
    const social = await socialModel.create(req.body);

    res.status(200).json({
        success: true,
        social
    })
})

// Update Social -- admin
export const updateSocial = catchAsyncError(async(req, res, next) => {
    let social = await socialModel.findById(req.params.id);

    if (!social) return next(new ErrorHander("Social not Found.", 404))

    social = await socialModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        social
    })
})

// Delete Social -- admin
export const deleteSocial = catchAsyncError(async(req, res, next) => {
    const social = await socialModel.findById(req.params.id);

    if (!social) return next(new ErrorHander("Social not Found.", 404))

    await social.remove();

    res.status(200).json({
        success: true
    })
})


// Delete Social -- admin
export const getAllSocial = catchAsyncError(async(req, res, next) => {

    const social = await socialModel.find();

    res.status(200).json({
        success: true,
        social
    })
})