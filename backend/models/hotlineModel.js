import mongoose from 'mongoose';

const hotlineSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name Hotline"]
    },
    phone: {
        type: Number,
        required: [true, "Please Enter Phone Number"],
        max: [9999999999, "Invalid phone Number max"],
        min: [9999999, "Invalid phone Number min"]
    }
})

export const hotlineModel = mongoose.model("Hotline", hotlineSchema);