const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
    {
        storeName: {
            type: String,
            required: true,
            trim: true
        },

        tagline: {
            type: String,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        phone: {
            type: String,
            trim: true
        },

        email: {
            type: String,
            trim: true
        },

        facebook: {
            type: String,
            trim: true
        },

        instagram: {
            type: String,
            trim: true
        },

        whatsapp: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const Settings = mongoose.model("Settings", settingsSchema);

module.exports = Settings;