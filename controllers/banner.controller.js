const Banner = require("../models/banner.model");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: "banners"
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
const createBanner = async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            desc: req.body.desc,
            btn1Text: req.body.btn1Text,
            btn1Link: req.body.btn1Link,
            btn2Text: req.body.btn2Text,
            btn2Link: req.body.btn2Link,
            order: req.body.order
        };

        if (req.file) {
            const result = await uploadToCloudinary(req.file.buffer);

            data.image = {
                url: result.secure_url,
                publicId: result.public_id
            };
        }

        const banner = await Banner.create(data);

        res.status(201).json({
            status: "success",
            data: banner
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


// GET ALL
const getBanners = async (req, res) => {
    try {
        const banners = await Banner.find(
            {},
            { __v: 0 }
        ).sort({ order: 1 });

        res.status(200).json({
            status: "success",
            results: banners.length,
            data: banners
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


// UPDATE
const updateBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.bannerId);

        if (!banner) {
            return res.status(404).json({
                status: "fail",
                message: "Banner not found"
            });
        }

        if (req.body.title !== undefined) {
            banner.title = req.body.title;
        }

        if (req.body.desc !== undefined) {
            banner.desc = req.body.desc;
        }

        if (req.body.btn1Text !== undefined) {
            banner.btn1Text = req.body.btn1Text;
        }

        if (req.body.btn1Link !== undefined) {
            banner.btn1Link = req.body.btn1Link;
        }

        if (req.body.btn2Text !== undefined) {
            banner.btn2Text = req.body.btn2Text;
        }

        if (req.body.btn2Link !== undefined) {
            banner.btn2Link = req.body.btn2Link;
        }

        if (req.body.order !== undefined) {
            banner.order = req.body.order;
        }

        // لو المستخدم رفع صورة جديدة
        if (req.file) {

            const result = await uploadToCloudinary(req.file.buffer);

            // حذف الصورة القديمة
            if (banner.image && banner.image.publicId) {
                await cloudinary.uploader.destroy(
                    banner.image.publicId
                );
            }

            banner.image = {
                url: result.secure_url,
                publicId: result.public_id
            };
        }

        await banner.save();

        res.status(200).json({
            status: "success",
            data: banner
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


// DELETE
const deleteBanner = async (req, res) => {
    try {
        const banner = await Banner.findById(
            req.params.bannerId
        );

        if (!banner) {
            return res.status(404).json({
                status: "fail",
                message: "Banner not found"
            });
        }

        // حذف الصورة من Cloudinary
        if (banner.image && banner.image.publicId) {
            await cloudinary.uploader.destroy(
                banner.image.publicId
            );
        }

        // حذف الـ Banner من MongoDB
        await Banner.findByIdAndDelete(
            req.params.bannerId
        );

        res.status(200).json({
            status: "success",
            message: "Banner deleted successfully"
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


// REORDER
const reorderBanners = async (req, res) => {
    try {
        const { orderedIds } = req.body;

        if (
            !Array.isArray(orderedIds) ||
            orderedIds.length === 0
        ) {
            return res.status(400).json({
                status: "fail",
                message: "orderedIds must be a non-empty array"
            });
        }

        const operations = orderedIds.map((id, index) => ({
            updateOne: {
                filter: { _id: id },
                update: { order: index }
            }
        }));

        await Banner.bulkWrite(operations);

        const banners = await Banner.find(
            {},
            { __v: 0 }
        ).sort({ order: 1 });

        res.status(200).json({
            status: "success",
            data: banners
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


module.exports = {
    createBanner,
    getBanners,
    updateBanner,
    deleteBanner,
    reorderBanners
};