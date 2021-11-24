import express from 'express';
import { createNews, deleteNews, getAllNews, getDetailNews, updateNews } from '../controllers/newsController.js';
import { authorizeRoles, isAuthenticateUser } from '../middleware/auth.js'

const router = express.Router();

// Create news -- admin
router.route("/admin/news/add").post(isAuthenticateUser, authorizeRoles("admin"), createNews);

//  Update & delete news -- admin
router.route("/admin/news/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateNews).delete(isAuthenticateUser, authorizeRoles("admin"), deleteNews);

// Get All news
router.route("/news").get(getAllNews);

// Get detail
router.route("/news/:id").get(getDetailNews);

export default router;