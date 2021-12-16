import {
  infoModel,
  bannerModel,
  menuFooterModel,
  mainvisualModel,
} from "../models/customerModel.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import ErrorHander from "../utils/errorhander.js";

// Create info -- admin
export const createInfo = catchAsyncError(async (req, res, next) => {
  const info = await infoModel.create(req.body);

  res.status(200).json({
    success: true,
    info,
  });
});

// Update info -- admin
export const updateInfo = catchAsyncError(async (req, res, next) => {
  let info = await infoModel.findById(req.params.id);

  if (!info) return next(new ErrorHander("info not Found.", 404));

  info = await infoModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    info,
  });
});

// Delete info -- admin
export const deleteInfo = catchAsyncError(async (req, res, next) => {
  const info = await infoModel.findById(req.params.id);

  if (!info) return next(new ErrorHander("info not Found.", 404));

  await info.remove();

  res.status(200).json({
    success: true,
  });
});

// Get All info -- admin
export const getAllInfo = catchAsyncError(async (req, res, next) => {
  const infos = await infoModel.find();

  res.status(200).json({
    success: true,
    infos,
  });
});

// Create banner -- admin
export const createBanner = catchAsyncError(async (req, res, next) => {
  const banner = await bannerModel.create(req.body);

  res.status(200).json({
    success: true,
    banner,
  });
});

// Update banner -- admin
export const updateBanner = catchAsyncError(async (req, res, next) => {
  let banner = await bannerModel.findById(req.params.id);

  if (!banner) return next(new ErrorHander("banner not Found.", 404));

  banner = await bannerModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    banner,
  });
});

// Delete banner -- admin
export const deleteBanner = catchAsyncError(async (req, res, next) => {
  const banner = await bannerModel.findById(req.params.id);

  if (!banner) return next(new ErrorHander("banner not Found.", 404));

  await banner.remove();

  res.status(200).json({
    success: true,
  });
});

// Get All banner -- admin
export const getAllBanner = catchAsyncError(async (req, res, next) => {
  const banners = await bannerModel.find();

  res.status(200).json({
    success: true,
    banners,
  });
});

// Create menuFooter -- admin
export const createMenuFooter = catchAsyncError(async (req, res, next) => {
  const menuFooter = await menuFooterModel.create(req.body);

  res.status(200).json({
    success: true,
    menuFooter,
  });
});

// Update menuFooter -- admin
export const updateMenuFooter = catchAsyncError(async (req, res, next) => {
  let menuFooter = await menuFooterModel.findById(req.params.id);

  if (!menuFooter) return next(new ErrorHander("menuFooter not Found.", 404));

  menuFooter = await menuFooterModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    menuFooter,
  });
});

// Delete menuFooter -- admin
export const deleteMenuFooter = catchAsyncError(async (req, res, next) => {
  const menuFooter = await menuFooterModel.findById(req.params.id);

  if (!menuFooter) return next(new ErrorHander("menuFooter not Found.", 404));

  await menuFooter.remove();

  res.status(200).json({
    success: true,
  });
});

// Get All menuFooter -- admin
export const getAllMenuFooter = catchAsyncError(async (req, res, next) => {
  const menuFooters = await menuFooterModel.find();

  res.status(200).json({
    success: true,
    menuFooters,
  });
});

// Create mainvisual -- admin
export const createMainvisual = catchAsyncError(async (req, res, next) => {
  const mainvisual = await mainvisualModel.create(req.body);

  res.status(200).json({
    success: true,
    mainvisual,
  });
});

// Update mainvisual -- admin
export const updateMainvisual = catchAsyncError(async (req, res, next) => {
  let mainvisual = await mainvisualModel.findById(req.params.id);

  if (!mainvisual) return next(new ErrorHander("Mainvisual not Found.", 404));

  mainvisual = await mainvisualModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    mainvisual,
  });
});

// Delete mainvisual -- admin
export const deleteMainvisual = catchAsyncError(async (req, res, next) => {
  const mainvisual = await mainvisualModel.findById(req.params.id);

  if (!mainvisual) return next(new ErrorHander("Mainvisual not Found.", 404));

  await mainvisual.remove();

  res.status(200).json({
    success: true,
  });
});

// Get All mainvisual -- admin
export const getAllMainvisual = catchAsyncError(async (req, res, next) => {
  const mainvisual = await mainvisualModel.find();

  res.status(200).json({
    success: true,
    mainvisual,
  });
});
