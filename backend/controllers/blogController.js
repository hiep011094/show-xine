import { blogModel } from '../models/blogModel.js';
import catchAsyncError from '../middleware/catchAsyncError.js'
import ErrorHander from '../utils/errorhander.js';

// Create Blog -- admin
export const createBlog = catchAsyncError(async(req, res, next) => {
    const blog = await blogModel.create(req.body);
    res.status(200).json({
        success: true,
        blog
    })
})

// Update Blog -- admin 
export const updateBlog = catchAsyncError(async(req, res, next) => {
    let blog = await blogModel.findById(req.params.id);

    if (!blog) return next(new ErrorHander("Blog not Found"))

    blog = await blogModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        blog
    })
})

// Delete blog -- admin
export const deleteBlog = catchAsyncError(async(req, res, next) => {
    const blog = await blogModel.findById(req.params.id);

    if (!blog) return next(new ErrorHander("Blog Not Found"));

    await blog.remove();

    res.status(200).json({
        success: true,
    });
});

// Get All Blog
export const getAllBlog = catchAsyncError(async(req, res, next) => {
    const blogs = await blogModel.find();

    res.status(200).json({
        success: true,
        blogs
    })
})

// Get Blog Detail by Id
export const getDetailBlog = catchAsyncError(async(req, res, next) => {
    const blog = await blogModel.findById(req.params.id);

    if (!blog) return next(new ErrorHander("Blog Not Found"));

    res.status(200).json({
        success: true,
        blog
    });
})