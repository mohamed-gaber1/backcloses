const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authentication.middleware");

const {
    updateSettingsValidation
} = require("../validation/settings.validation");

const settingsController = require("../controllers/settings.controller");


router.get(
    "/",
    settingsController.getSettings
);


router.patch(
    "/",
    authentication,
    updateSettingsValidation,
    settingsController.updateSettings
);


module.exports = router;