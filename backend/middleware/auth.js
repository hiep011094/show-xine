import ErrorHander from "../utils/errorhander.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const isAuthenticateUser = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHander("Please Login to access this resource", 401));
  }
  const dacodeData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await userModel.findById(dacodeData.id);
  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce.`,
          403
        )
      );
    }
    next();
  };
};
