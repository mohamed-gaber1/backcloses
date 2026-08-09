const About = require("../models/about.model");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            {
                folder: "about"
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


// GET
const getAbout = async (req, res) => {
    try {
        let about = await About.findOne({}, { __v: 0 });

        if (!about) {
            about = await About.create({
                title: "About Us"
            });
        }

        res.status(200).json({
            status: "success",
            data: about
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


// UPDATE
const updateAbout = async (req, res) => {
    try {
        let about = await About.findOne();

        // أول مرة
        if (!about) {
            const data = {
                title: req.body.title || "About Us",
                text: req.body.text,
                stats: req.body.stats
            };

            if (req.file) {
                const result = await uploadToCloudinary(
                    req.file.buffer
                );

                data.image = {
                    url: result.secure_url,
                    publicId: result.public_id
                };
            }

            about = await About.create(data);

        } else {

            // تحديث البيانات فقط لو اتبعت
            if (req.body.title !== undefined) {
                about.title = req.body.title;
            }

            if (req.body.text !== undefined) {
                about.text = req.body.text;
            }

            if (req.body.stats !== undefined) {
                about.stats = req.body.stats;
            }

            // لو فيه صورة جديدة
            if (req.file) {

                const result = await uploadToCloudinary(
                    req.file.buffer
                );

                // حذف الصورة القديمة
                if (
                    about.image &&
                    about.image.publicId
                ) {
                    await cloudinary.uploader.destroy(
                        about.image.publicId
                    );
                }

                about.image = {
                    url: result.secure_url,
                    publicId: result.public_id
                };
            }

            await about.save();
        }

        res.status(200).json({
            status: "success",
            data: about
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


module.exports = {
    getAbout,
    updateAbout
};