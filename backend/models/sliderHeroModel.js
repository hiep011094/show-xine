import mongoose from 'mongoose';

const sliderHeroSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Slider Hero Name"]
    },
    image: {
        type: String,
        required: [true, "Please Enter Slider Hero Image"]
    },
    description: {
        type: String,
        required: [true, "Please Enter Slider Hero Description"]
    },
    path: {
        type: String,
        required: [true, "Please Enter Slider Hero Path"]
    },
    color: {
        type: String,
        required: false,
    }
})

export const sliderHeroModel = mongoose.model("SliderHero", sliderHeroSchema)