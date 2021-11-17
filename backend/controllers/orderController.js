import { orderModel } from '../models/orderModel.js'
import { productModel } from "../models/productModel.js";
import ErrorHander from "../utils/errorhander.js";
import catchAsyncError from "../middleware/catchAsyncError.js";

// Create new Order

export const newOrder = catchAsyncError(async(req, res, nex) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    const order = await orderModel.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paiAt: Date.now(),
        user: req.user._id,
    })

    res.status(200).json({
        success: true,
        order
    })
})

// get Order by id
export const getSingleOrder = catchAsyncError(async(req, res, next) => {
    const order = await orderModel.findById(req.params.id).populate(
        "user",
        "fullname email"
    )

    if (!order) return next(new ErrorHander("Order not found with this Id.", 404))

    res.status(200).json({
        success: true,
        order,
    })


})

// get logged in user Order
export const myOrders = catchAsyncError(async(req, res, next) => {
    const orders = await orderModel.find({ user: req.user._id })

    res.status(200).json({
        success: true,
        orders,
    })


})

// get All Orders -- admin
export const getAllOrder = catchAsyncError(async(req, res, next) => {
    const orders = await orderModel.find()

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })

})

// update Orders status-- admin
export const updateStatusOrder = catchAsyncError(async(req, res, next) => {
    const order = await orderModel.findById(req.params.id)

    if (!order) return next(new ErrorHander("Order not found with this Id.", 404))

    if (order.orderStatus === "delivered") {
        return next(new ErrorHander("You have already delivered this order", 400))
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    })


    order.orderStatus = req.body.orderStatus;

    if (req.body.orderStatus === "delivered") {
        order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })


})

async function updateStock(id, quantity) {
    const product = await productModel.findById(id);
    product.Stock -= quantity;

    await product.save({ validateBeforeSave: false });
}

// delete Order -- admin
export const deleteOrder = catchAsyncError(async(req, res, next) => {
    const order = await orderModel.findById(req.params.id)

    if (!order) return next(new ErrorHander("Order not found with this Id.", 404))

    await order.remove()

    res.status(200).json({
        success: true,
    })

})