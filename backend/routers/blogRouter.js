import express from 'express';
import { createBlog, updateBlog, deleteBlog, getAllBlog, getDetailBlog } from '../controllers/blogController.js';
import { authorizeRoles, isAuthenticateUser } from '../middleware/auth.js'

const router = express.Router();

// Create blog -- admin
router.route("/admin/blog/add").post(isAuthenticateUser, authorizeRoles("admin"), createBlog);

//  Update & delete blog -- admin
router.route("/admin/blog/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateBlog).delete(isAuthenticateUser, authorizeRoles("admin"), deleteBlog);

// Get All Blog
router.route("/blogs").get(getAllBlog);

// Get detail
router.route("/blog/:id").get(getDetailBlog);

export default router;