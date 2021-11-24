import { newsModel } from '../models/newsModel.js';
import catchAsyncError from '../middleware/catchAsyncError.js'
import ErrorHander from '../utils/errorhander.js';

// Create news -- admin
export const createNews = catchAsyncError(async(req, res, next) => {
    const news = await newsModel.create(req.body);
    res.status(200).json({
        success: true,
        news
    })
})

// Update news -- admin 
export const updateNews = catchAsyncError(async(req, res, next) => {
    let news = await newsModel.findById(req.params.id);

    if (!news) return next(new ErrorHander("news not Found"))

    news = await newsModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        news
    })
})

// Delete news -- admin
export const deleteNews = catchAsyncError(async(req, res, next) => {
    const news = await newsModel.findById(req.params.id);

    if (!news) return next(new ErrorHander("news Not Found"));

    await news.remove();

    res.status(200).json({
        success: true,
    });
});

// Get All news
export const getAllNews = catchAsyncError(async(req, res, next) => {
    const news = await newsModel.find();

    res.status(200).json({
        success: true,
        news
    })
})

// Get news Detail by Id
export const getDetailNews = catchAsyncError(async(req, res, next) => {
    const news = await newsModel.findById(req.params.id);

    if (!news) return next(new ErrorHander("news Not Found"));

    res.status(200).json({
        success: true,
        news
    });
})