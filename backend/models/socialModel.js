import mongoose from 'mongoose';

const socialSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Social Name."]
    },
    path: {
        type: String,
        required: [true, "Please Enter Social Path."]
    }
})

export const socialModel = mongoose.model("Social", socialSchema);