const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        desc: {
            type: String,
            trim: true
        },

        image: {
            url: {
                type: String,
                default: null
            },
            publicId: {
                type: String,
                default: null
            }
        },

        btn1Text: {
            type: String,
            trim: true
        },

        btn1Link: {
            type: String,
            trim: true
        },

        btn2Text: {
            type: String,
            trim: true
        },

        btn2Link: {
            type: String,
            trim: true
        },

        order: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

const Banner = mongoose.model("Banner", bannerSchema);

module.exports = Banner;