const Settings = require("../models/settings.model");

const getSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne({}, { __v: 0 });

        // لو مفيش Settings، نرجع بيانات فاضية بدل Error
        if (!settings) {
            settings = await Settings.create({
                storeName: "Nokhba Men"
            });
        }

        res.status(200).json({
            status: "success",
            data: settings
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


const updateSettings = async (req, res) => {
    try {
        let settings = await Settings.findOne();

        // لو أول مرة نعمل Settings
        if (!settings) {
            settings = await Settings.create(req.body);
        } else {
            Object.assign(settings, req.body);
            await settings.save();
        }

        res.status(200).json({
            status: "success",
            data: settings
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};


module.exports = {
    getSettings,
    updateSettings
};