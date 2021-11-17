import express from "express";
import {
    getAllProduct,
    getDetailsProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductReviews,
    deleteProductReviews,
    createCommentReview,
    updateCommentReview,
    deleteCommentReview,
    createAndUpdateRatingReview,
    getAllCommentReview,
} from "../controllers/productController.js";
import { authorizeRoles, isAuthenticateUser } from "../middleware/auth.js";

const router = express.Router();

// Get All Products
router.route("/products").get(getAllProduct);

// Get Product details
router.route("/product/:id").get(getDetailsProduct);

// Create Product
router
    .route("/admin/product/new")
    .post(isAuthenticateUser, authorizeRoles("admin"), createProduct);

// Product Delete & Update
router
    .route("/admin/product/:id")
    .put(isAuthenticateUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticateUser, authorizeRoles("admin"), deleteProduct);

// Create New Review or Update the review
router.route("/review").put(isAuthenticateUser, createAndUpdateRatingReview);

// Get all Review and delete
router
    .route("/reviews")
    .get(getProductReviews)
    .delete(isAuthenticateUser, deleteProductReviews);

// Create New comment
router.route("/comment/add").post(isAuthenticateUser, createCommentReview);

// Update the comment 
router.route("/comment/update/:id").put(isAuthenticateUser, updateCommentReview);

// Delete the comment
router.route("/comment/delete/:id").put(isAuthenticateUser, deleteCommentReview);

// Get All the comment
router.route("/comments").get(isAuthenticateUser, getAllCommentReview);



export default router;