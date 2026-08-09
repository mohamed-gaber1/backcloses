const { body } = require("express-validator");
const validationMiddleware = require("../middlewares/validation.middleware");

const creatOfferValidate = [
    body("title")
        .notEmpty()
        .withMessage("Title is required"),

    body("description")
        .optional()
        .trim(),

    body("discount")
        .optional()
        .trim(),

    body("startDate")
        .notEmpty()
        .withMessage("Start Date is required"),

    body("endDate")
        .notEmpty()
        .withMessage("End Date is required"),

    validationMiddleware
];

const updateOfferValidate = [
    body("title")
        .optional()
        .notEmpty()
        .withMessage("Title cannot be empty"),

    body("description")
        .optional()
        .trim(),

    body("discount")
        .optional()
        .trim(),

    body("startDate")
        .optional(),

    body("endDate")
        .optional(),

    validationMiddleware
];

module.exports = {
    creatOfferValidate,
    updateOfferValidate
};