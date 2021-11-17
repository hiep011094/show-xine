import express from 'express';
import { createrHotline, deleteHotline, getAllHotline, updateHotline } from '../controllers/hotlineController.js';
import { authorizeRoles, isAuthenticateUser } from "../middleware/auth.js";

const router = express.Router();

router.route("/admin/hotline/add").post(isAuthenticateUser, authorizeRoles("admin"), createrHotline);

router.route("/admin/hotline/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateHotline).delete(isAuthenticateUser, authorizeRoles("admin"), deleteHotline);

router.route("/hotlines").get(getAllHotline);

export default router;