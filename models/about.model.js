const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        text: {
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

        stats: [
            {
                label: {
                    type: String,
                    trim: true
                },

                value: {
                    type: String,
                    trim: true
                },

                visible: {
                    type: Boolean,
                    default: true
                },

                order: {
                    type: Number,
                    default: 0
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

const About = mongoose.model("About", aboutSchema);

module.exports = About;