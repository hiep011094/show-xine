import express from 'express';
import { createSocial, deleteSocial, getAllSocial, updateSocial } from '../controllers/socialController.js';
import { authorizeRoles, isAuthenticateUser } from "../middleware/auth.js";

const router = express.Router();

// Create Social -- admin
router.route("/admin/social/add").post(isAuthenticateUser, authorizeRoles("admin"), createSocial);

// Update & delete Social -- admin
router.route("/admin/social/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateSocial).delete(isAuthenticateUser, authorizeRoles("admin"), deleteSocial);

// Get All Social -- admin
router.route("/socials").get(getAllSocial);

export default router;