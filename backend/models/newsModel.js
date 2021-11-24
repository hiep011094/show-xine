import mongoose from 'mongoose';

const newsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Blog Name"]
    },
    image: {
        type: String,
        required: [true, "Please Enter Blog Image"]
    },
    category: {
        type: String,
        required: [true, "Please Enter Blog Category"]
    },
    description: {
        type: String,
        required: [true, "Please Enter Description"]
    },
    content: {
        type: String,
        required: false
    }
});

export const newsModel = mongoose.model("News", newsSchema);