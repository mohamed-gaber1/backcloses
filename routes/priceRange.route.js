const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authentication.middleware");

const {
    createPriceRangeValidation,
    updatePriceRangeValidation
} = require("../validation/priceRange.validation");

const priceRangeController = require("../controllers/priceRange.controller");


// Public
router.get(
    "/",
    priceRangeController.getPriceRanges
);


// Admin panel
router.post(
    "/",
    authentication,
    createPriceRangeValidation,
    priceRangeController.createPriceRange
);

router.patch(
    "/:priceRangeId",
    authentication,
    updatePriceRangeValidation,
    priceRangeController.updatePriceRange
);

router.delete(
    "/:priceRangeId",
    authentication,
    priceRangeController.deletePriceRange
);


module.exports = router;