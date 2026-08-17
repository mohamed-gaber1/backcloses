const PriceRange = require("../models/priceRange.model");


// Get all price ranges
const getPriceRanges = async (req, res) => {
    try {
        const priceRanges = await PriceRange.find()
            .sort({ order: 1 });

        res.status(200).json({
            status: "success",
            results: priceRanges.length,
            data: priceRanges
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


// Create price range
const createPriceRange = async (req, res) => {
    try {
        const priceRange = await PriceRange.create(req.body);

        res.status(201).json({
            status: "success",
            data: priceRange
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


// Update price range
const updatePriceRange = async (req, res) => {
    try {
        const priceRange = await PriceRange.findByIdAndUpdate(
            req.params.priceRangeId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!priceRange) {
            return res.status(404).json({
                status: "fail",
                message: "Price range not found"
            });
        }

        res.status(200).json({
            status: "success",
            data: priceRange
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


// Delete price range
const deletePriceRange = async (req, res) => {
    try {
        const priceRange = await PriceRange.findByIdAndDelete(
            req.params.priceRangeId
        );

        if (!priceRange) {
            return res.status(404).json({
                status: "fail",
                message: "Price range not found"
            });
        }

        res.status(200).json({
            status: "success",
            message: "Price range deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


module.exports = {
    getPriceRanges,
    createPriceRange,
    updatePriceRange,
    deletePriceRange
};