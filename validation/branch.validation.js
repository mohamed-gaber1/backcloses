const { body } = require("express-validator");
const validationMiddleware = require("../middlewares/validation.middleware");

const createBranchValidation = [

    body("name")
        .notEmpty()
        .withMessage("Branch name is required"),

    body("address")
        .notEmpty()
        .withMessage("Address is required"),

    body("phone")
        .notEmpty()
        .withMessage("Phone is required"),

    body("hours")
        .notEmpty()
        .withMessage("Working hours are required"),

    body("maps")
        .optional()
        .trim(),

    validationMiddleware
];


const updateBranchValidation = [

    body("name")
        .optional()
        .notEmpty()
        .withMessage("Branch name cannot be empty"),

    body("address")
        .optional()
        .notEmpty()
        .withMessage("Address cannot be empty"),

    body("phone")
        .optional()
        .notEmpty()
        .withMessage("Phone cannot be empty"),

    body("hours")
        .optional()
        .notEmpty()
        .withMessage("Working hours cannot be empty"),

    body("maps")
        .optional()
        .trim(),

    validationMiddleware
];


module.exports = {
    createBranchValidation,
    updateBranchValidation
};