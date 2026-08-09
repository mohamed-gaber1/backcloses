const express = require("express");
const router = express.Router();

const authentication = require("../middlewares/authentication.middleware");
const optionalAuthentication = require("../middlewares/optionalAuthentication.middleware");

const testimonialController = require("../controllers/testimonial.controller");

const {
    createTestimonialValidation
} = require("../validation/testimonial.validation");


// Create
router.post(
    "/",
    createTestimonialValidation,
    testimonialController.createTestimonial
);


// Get
router.get(
    "/",
    optionalAuthentication,
    testimonialController.getTestimonials
);


// Approve
router.patch(
    "/:testimonialId/approve",
    authentication,
    testimonialController.approveTestimonial
);


// Reject
router.patch(
    "/:testimonialId/reject",
    authentication,
    testimonialController.rejectTestimonial
);


// Delete
router.delete(
    "/:testimonialId",
    authentication,
    testimonialController.deleteTestimonial
);

module.exports = router;