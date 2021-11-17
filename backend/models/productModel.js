import mongoose from "mongoose";
import { removeVietnameseTones } from "../utils/convertVnStr.js";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true,
    },
    search: {
        type: String,
    },
    description: {
        type: String,
        required: [true, "Please Enter Product Description"],
    },
    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
    },
    price_old: {
        type: Number,
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images: [{
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    }, ],
    colors: [{
        public_id: {
            type: String,
            required: true,
        },
        color: {
            type: String,
            required: true,
        },
    }, ],
    sizes: [{
        public_id: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            required: true,
        },
    }, ],
    category: {
        type: String,
        required: [true, "Please Enter Product Category"],
    },
    Stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
        },
        comments: [
            new mongoose.Schema({
                comment: {
                    type: String,
                    required: true,
                }
            }, { timestamps: true })
        ]
    }, ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true });

productSchema.pre("save", async function(next) {
    this.search = await removeVietnameseTones(this.name);
});

export const productModel = mongoose.model("Product", productSchema);