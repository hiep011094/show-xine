import mongoose from "mongoose";

const info = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter info Name"],
  },
  images: [
    {
      url: {
        type: String,
        required: true,
      },
    },
  ],
  content: String,
});

const menuFooter = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Menu Footer Name"],
  },
  path: {
    type: String,
    required: [true, "Please Enter Menu Footer Path"],
  },
});

const banner = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter banner Name"],
  },
  image: {
    type: String,
    required: [true, "Please Enter banner Image"],
  },
  path: String,
});

const mainvisual = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter banner Name"],
  },
  decription: {
    type: String,
  },
  video: {
    type: String,
    required: [true, "Please Enter banner Image"],
  },
  path: String,
});

export const infoModel = mongoose.model("Info", info);
export const menuFooterModel = mongoose.model("MenuFooter", menuFooter);
export const bannerModel = mongoose.model("Banner", banner);
export const mainvisualModel = mongoose.model("Mainvisual", mainvisual);
