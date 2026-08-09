const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authentication.middleware");
const upload = require("../middlewares/upload.middleware");

const aboutController = require("../controllers/about.controller");


router.get(
    "/",
    aboutController.getAbout
);


router.patch(
    "/",
    authentication,
    upload.single("image"),
    aboutController.updateAbout
);


module.exports = router;