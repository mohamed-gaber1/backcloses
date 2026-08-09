const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authentication.middleware");
const upload = require("../middlewares/upload.middleware");

const {
    createBannerValidation,
    updateBannerValidation
} = require("../validation/banner.validation");

const bannerController = require("../controllers/banner.controller");


// Public
router.get(
    "/",
    bannerController.getBanners
);


// Admin panel
router.post(
    "/",
    authentication,
    upload.single("image"),
    createBannerValidation,
    bannerController.createBanner
);

router.patch(
    "/reorder",
    authentication,
    bannerController.reorderBanners
);


router.patch(
    "/:bannerId",
    authentication,
    upload.single("image"),
    updateBannerValidation,
    bannerController.updateBanner
);    


router.delete(
    "/:bannerId",
    authentication,
    bannerController.deleteBanner
);    



module.exports = router;