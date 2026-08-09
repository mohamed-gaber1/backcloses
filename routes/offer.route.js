const express = require("express");
const router = express.Router();

const offerController = require("../controllers/offer.controller");
const authentication = require("../middlewares/authentication.middleware");
const offerValidation = require("../validation/offer.validation");
const upload = require("../middlewares/upload.middleware");

router.post(
    "/",
    authentication,
    upload.single("image"),
    offerValidation.creatOfferValidate,
    offerController.createOffer
);

router.get(
    "/",
    offerController.getAllOffers
);

router.patch(
    "/:offerId",
    authentication,
    upload.single("image"),
    offerValidation.updateOfferValidate,
    offerController.updateOffer
);

router.delete(
    "/:offerId",
    authentication,
    offerController.deleteOffer
);

module.exports = router;