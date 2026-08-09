const { body } = require("express-validator");
const validationMiddleware = require("../middlewares/validation.middleware");

const updateSettingsValidation = [

    body("storeName")
        .optional()
        .notEmpty()
        .withMessage("Store name cannot be empty"),

    body("tagline")
        .optional()
        .isString()
        .withMessage("Tagline must be a string"),

    body("description")
        .optional()
        .isString()
        .withMessage("Description must be a string"),

    body("phone")
        .optional()
        .isString()
        .withMessage("Phone must be a string"),

    body("email")
        .optional()
        .isEmail()
        .withMessage("Invalid email"),

    body("facebook")
        .optional()
        .isString()
        .withMessage("Facebook must be a string"),

    body("instagram")
        .optional()
        .isString()
        .withMessage("Instagram must be a string"),

    body("whatsapp")
        .optional()
        .isString()
        .withMessage("WhatsApp must be a string"),

    validationMiddleware
];

module.exports = {
    updateSettingsValidation
};