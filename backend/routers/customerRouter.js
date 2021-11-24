import express from 'express';
import { createBanner, createInfo, createMenuFooter, deleteBanner, deleteInfo, deleteMenuFooter, getAllBanner, getAllInfo, getAllMenuFooter, updateBanner, updateInfo, updateMenuFooter } from '../controllers/customerController.js';
import { authorizeRoles, isAuthenticateUser } from "../middleware/auth.js";

const router = express.Router();

// Create info -- admin
router.route("/admin/info/add").post(isAuthenticateUser, authorizeRoles("admin"), createInfo);

// Update & delete info -- admin
router.route("/admin/info/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateInfo).delete(isAuthenticateUser, authorizeRoles("admin"), deleteInfo);

// Get All info -- admin
router.route("/infos").get(getAllInfo);

// Create banner -- admin
router.route("/admin/banner/add").post(isAuthenticateUser, authorizeRoles("admin"), createBanner);

// Update & delete banner -- admin
router.route("/admin/banner/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateBanner).delete(isAuthenticateUser, authorizeRoles("admin"), deleteBanner);

// Get All banner -- admin
router.route("/banners").get(getAllBanner);

// Create menuFooter -- admin
router.route("/admin/menu-footer/add").post(isAuthenticateUser, authorizeRoles("admin"), createMenuFooter);

// Update & delete menuFooter -- admin
router.route("/admin/menu-footer/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateMenuFooter).delete(isAuthenticateUser, authorizeRoles("admin"), deleteMenuFooter);

// Get All menuFooter -- admin
router.route("/menu-footers").get(getAllMenuFooter);



export default router;