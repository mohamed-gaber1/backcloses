const mongoose = require("mongoose");

const priceRangeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        minPrice: {
            type: Number,
            required: true,
            min: 0
        },

        maxPrice: {
            type: Number,
            required: true,
            min: 0
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

const PriceRange = mongoose.model("PriceRange", priceRangeSchema);

module.exports = PriceRange;