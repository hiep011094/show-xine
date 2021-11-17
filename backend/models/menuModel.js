import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Name Menu"]
    },
    path: {
        type: String,
        required: [true, "Please Enter Path Menu"]
    },
    submenu: [
        new mongoose.Schema({
            name_sub: {
                type: String,
                required: true
            },
            path_sub: {
                type: String,
                required: true
            }
        })
    ]
})

export const menuModel = mongoose.model("Menu", menuSchema);