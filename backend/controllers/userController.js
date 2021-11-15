import ErrorHander from "../utils/errorhander.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { userModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
// Register a User

export const registerUser = catchAsyncError(async (req, res, nex) => {
  const { fullname, email, password } = req.body;

  const user = await userModel.create({
    fullname,
    email,
    password,
    avatar: {
      public_id: "this id sample",
      url: "profilepiurl",
    },
  });

  sendToken(user, 201, res);
});

// Login User

export const loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await userModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  // compare Password

  const isPasswordMatched = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(user, 201, res);
});

//Logout User

export const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged Out",
  });
});

// Forgot Password

export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) return next(new ErrorHander("User not found", 404));

  // Get ResetPassword
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/reset/${resetToken}`;

  const message = `Your password reset token is: \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it. `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Shop Xine Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password

export const resetPassword = catchAsyncError(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user)
    return next(
      new ErrorHander(
        "Reset Password token is invalid or has been expired",
        400
      )
    );

  if (req.body.password !== req.body.confirmPassword)
    return next(new ErrorHander("Password does not password", 400));

  user.password = req.body.password;

  user.resetPasswordToken = undefined;

  user.resetPasswordExpire = undefined;

  await user.save();
  sendToken(user, 200, res);
});

// Get user Detail
export const getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user Password
export const updatePasswordUser = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password");

  // compare Password

  const isPasswordMatched = await bcrypt.compare(
    req.body.oldPassword,
    user.password
  );

  if (!isPasswordMatched)
    return next(new ErrorHander("Old password is incorrect", 400));

  if (req.body.newPassword !== req.body.confirmPassword)
    return next(new ErrorHander("Password does not match", 400));

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

// Update user profile
export const updateProfileUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    fullname: req.body.fullname,
    address: req.body.address,
    avatar: req.body.avatar,
  };

  // We will add cloudinary later

  const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

// Get all Users ( admin )
export const getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await userModel.find();
  res.status(200).json({
    success: true,
    users,
  });
});

// Get single User ( admin )
export const getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  if (!user)
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );

  res.status(200).json({
    success: true,
    user,
  });
});

// Update user ( admin )
export const updateUser = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    email: req.body.email,
    fullname: req.body.fullname,
    address: req.body.address,
    avatar: req.body.avatar,
    role: req.body.role,
  };

  // We will add cloudinary later

  const user = await userModel.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    message: "Update User Successfully",
    user,
  });
});

// Delete user ( admin )
export const deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  if (!user)
    return next(
      new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
    );

  await user.remove();

  res.status(200).json({
    success: true,
    message: "Delete User Successfully",
  });
});

//
