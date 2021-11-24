import express from 'express';
import { createSliderHero, updateSliderHero, deleteSliderHero, getAllSliderHero } from '../controllers/sliderHeroController.js';
import { authorizeRoles, isAuthenticateUser } from "../middleware/auth.js";

const router = express.Router();

// Create Slider Hero -- admin
router.route("/admin/slider-hero/add").post(isAuthenticateUser, authorizeRoles("admin"), createSliderHero);

// Update & delete Slider Hero -- admin
router.route("/admin/slider-hero/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateSliderHero).delete(isAuthenticateUser, authorizeRoles("admin"), deleteSliderHero);

// Get All Slider Hero
router.route("/slider-heros").get(getAllSliderHero);

export default router;