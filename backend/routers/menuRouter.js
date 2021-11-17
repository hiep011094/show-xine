import express from 'express'
import { createMenu, deleteMenu, getAllMenu, updateMenu } from '../controllers/menuController.js';
import { authorizeRoles, isAuthenticateUser } from "../middleware/auth.js";

const router = express.Router();

// create menu --admin
router.route("/admin/menu/add").post(isAuthenticateUser, authorizeRoles("admin"), createMenu);

// update menu --admin
router.route("/admin/menu/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateMenu).delete(isAuthenticateUser, authorizeRoles("admin"), deleteMenu);

// Get all menu --admin
router.route("/menus").get(getAllMenu);





export default router;