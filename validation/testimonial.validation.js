const { body } = require("express-validator");
const validationMiddleware = require("../middlewares/validation.middleware");

const createTestimonialValidation = [

    body("name")
        .notEmpty()
        .withMessage("Name is required"),

    body("rating")
        .notEmpty()
        .withMessage("Rating is required")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be between 1 and 5"),

    body("comment")
        .notEmpty()
        .withMessage("Comment is required"),

    validationMiddleware
];

module.exports = {
    createTestimonialValidation
};