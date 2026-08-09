const Offer = require("../models/offer.model");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: "offers"
            },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        ).end(fileBuffer);
    });
};


// CREATE
const createOffer = async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            description: req.body.description,
            discount: req.body.discount,
            startDate: req.body.startDate,
            endDate: req.body.endDate
        };

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);

            data.image = {
                url: result.secure_url,
                publicId: result.public_id
            };
        }

        const offer = await Offer.create(data);

        res.status(201).json({
            status: "success",
            data: offer
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


// GET
const getAllOffers = async (req, res) => {
    try {
        const offers = await Offer.find({}, { __v: 0 });

        res.status(200).json({
            status: "success",
            results: offers.length,
            data: offers
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


// UPDATE
const updateOffer = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.offerId);

        if (!offer) {
            return res.status(404).json({
                status: "fail",
                message: "Offer not found"
            });
        }

        if (req.body.title !== undefined) {
            offer.title = req.body.title;
        }

        if (req.body.description !== undefined) {
            offer.description = req.body.description;
        }

        if (req.body.discount !== undefined) {
            offer.discount = req.body.discount;
        }

        if (req.body.startDate !== undefined) {
            offer.startDate = req.body.startDate;
        }

        if (req.body.endDate !== undefined) {
            offer.endDate = req.body.endDate;
        }

        if (req.file) {

            // Delete old image
            if (offer.image && offer.image.publicId) {
                await cloudinary.uploader.destroy(
                    offer.image.publicId
                );
            }

            // Upload new image
            const result = await uploadToCloudinary(
                req.file.buffer
            );

            offer.image = {
                url: result.secure_url,
                publicId: result.public_id
            };
        }

        await offer.save();

        res.status(200).json({
            status: "success",
            data: offer
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


// DELETE
const deleteOffer = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.offerId);

        if (!offer) {
            return res.status(404).json({
                status: "fail",
                message: "Offer not found"
            });
        }

        // Delete image from Cloudinary
        if (offer.image && offer.image.publicId) {
            await cloudinary.uploader.destroy(
                offer.image.publicId
            );
        }

        // Delete offer from MongoDB
        await Offer.findByIdAndDelete(req.params.offerId);

        res.status(200).json({
            status: "success",
            message: "Offer deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


module.exports = {
    createOffer,
    getAllOffers,
    updateOffer,
    deleteOffer
};