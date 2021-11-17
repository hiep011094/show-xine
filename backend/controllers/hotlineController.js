import catchAsyncError from '../middleware/catchAsyncError.js'
import ErrorHander from "../utils/errorhander.js";
import { hotlineModel } from '../models/hotlineModel.js'

// Creater Hot Line -- Admin

export const createrHotline = catchAsyncError(async(req, res, next) => {

    const hotline = await hotlineModel.create(req.body);

    res.status(200).json({
        success: true,
        hotline
    })
});


// Update all Hot Line -- Admin

export const updateHotline = catchAsyncError(async(req, res, next) => {

    let hotline = await hotlineModel.findById(req.params.id);

    if (!hotline) return next(new ErrorHander("Hot Line not found.", 404));

    hotline = await hotlineModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        hotline
    })
})

// Delete all Hot Line -- Admin

export const deleteHotline = catchAsyncError(async(req, res, next) => {

    const hotline = await hotlineModel.findById(req.params.id);

    if (!hotline) return next(new ErrorHander("Hot Line not found.", 404));

    await hotline.remove();

    res.status(200).json({
        success: true
    })
})

// Get all Hot Line -- Admin

export const getAllHotline = catchAsyncError(async(req, res, next) => {

    const hotline = await hotlineModel.find();

    res.status(200).json({
        success: true,
        hotline
    })
})