import { menuModel } from "../models/menuModel.js";
import ErrorHander from "../utils/errorhander.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

// Create menu --admin
export const createMenu = catchAsyncError(async (req, res, next) => {
  const menu = await menuModel.create(req.body);

  res.status(200).json({
    success: true,
    menu,
  });
});

// Update menu --admin
export const updateMenu = catchAsyncError(async (req, res, next) => {
  let menu = await menuModel.findById(req.params.id);

  if (!menu) {
    return next(new ErrorHander("Menu not found.", 404));
  }

  menu = await menuModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    menu,
  });
});

// Delete menu --admin
export const deleteMenu = catchAsyncError(async (req, res, next) => {
  const menu = await menuModel.findById(req.params.id);

  if (!menu) {
    return next(new ErrorHander("Menu not found.", 404));
  }

  await menu.remove();

  res.status(200).json({
    success: true,
    message: "Delete Menu successfully",
  });
});

// Get All menu
export const getAllMenu = catchAsyncError(async (req, res, next) => {
  const menus = await menuModel.find();
  res.status(200).json({
    success: true,
    menus,
  });
});
