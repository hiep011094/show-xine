import { sliderHeroModel } from '../models/sliderHeroModel.js';
import ErrorHander from "../utils/errorhander.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

// Create Slider Hero -- admin
export const createSliderHero = catchAsyncError(async(req, res, next) => {
    const sliderHero = await sliderHeroModel.create(req.body);
    res.status(200).json({
        success: true,
        sliderHero
    });
})

// Update Slider Hero -- admin
export const updateSliderHero = catchAsyncError(async(req, res, next) => {
    let sliderHero = await sliderHeroModel.findById(req.params.id);

    if (!sliderHero) return next(new ErrorHander("Slider Hero Not Found"), 404);

    sliderHero = await sliderHeroModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        sliderHero
    });
})

// Delete Slider Hero -- admin
export const deleteSliderHero = catchAsyncError(async(req, res, next) => {
    const sliderHero = await sliderHeroModel.findById(req.params.id);

    if (!sliderHero) return next(new ErrorHander("Slider Hero Not Found"));

    await sliderHero.remove();

    res.status(200).json({
        success: true
    })
});

// Get All Slider Hero
export const getAllSliderHero = catchAsyncError(async(req, res, next) => {
    const sliderHeros = await sliderHeroModel.find();
    res.status(200).json({
        success: true,
        sliderHeros
    })
})