import express from "express"
import { deleteOrder, getAllOrder, getSingleOrder, myOrders, newOrder, updateStatusOrder } from "../controllers/orderController.js";
import { authorizeRoles, isAuthenticateUser } from "../middleware/auth.js";

const router = express.Router();
// Create Order
router.route("/order/new").post(isAuthenticateUser, newOrder);

// get Order by id -- admin
router.route("/order/:id").get(isAuthenticateUser, getSingleOrder);

// get Order Single
router.route("/orders/me").get(isAuthenticateUser, myOrders);

// get All Order -- admin
router.route("/admin/orders").get(isAuthenticateUser, authorizeRoles("admin"), getAllOrder);

// update & delete status Order -- admin
router.route("/admin/order/:id").put(isAuthenticateUser, authorizeRoles("admin"), updateStatusOrder).delete(isAuthenticateUser, authorizeRoles("admin"), deleteOrder);



export default router;