const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            (error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);

            }
        );
        streamifier
        .createReadStream(buffer)
        .pipe(uploadStream);


    });
};
module.exports = uploadToCloudinary;