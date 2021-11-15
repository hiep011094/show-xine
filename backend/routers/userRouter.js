import express from "express";
import {
  deleteUser,
  forgotPassword,
  getAllUser,
  getSingleUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updatePasswordUser,
  updateProfileUser,
  updateUser,
} from "../controllers/userController.js";
import { isAuthenticateUser, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

router.route("/logout").get(logoutUser);

router.route("/me/profile").get(isAuthenticateUser, getUserDetails);

router.route("/me/update/password").put(isAuthenticateUser, updatePasswordUser);

router.route("/me/profile/update").put(isAuthenticateUser, updateProfileUser);

router
  .route("/admin/users")
  .get(isAuthenticateUser, authorizeRoles("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticateUser, authorizeRoles("admin"), getSingleUser)
  .put(isAuthenticateUser, authorizeRoles("admin"), updateUser)
  .delete(isAuthenticateUser, authorizeRoles("admin"), deleteUser);

export default router;
