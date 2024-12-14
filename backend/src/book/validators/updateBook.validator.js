const { body, validationResult } = require("express-validator");

const updateBookValidator = [
    body("categoryId")
        .optional()
        .isMongoId().withMessage("categoryId must be a valid ObjectId."),
    
    body("name")
        .optional()
        .isString().withMessage("Book name must be a string.")
        .isLength({ min: 1 }).withMessage("name can't be an empty string."),
    
    body("author")
        .optional()
        .isString().withMessage("Author name must be a string.")
        .isLength({ min: 1 }).withMessage("author can't be an empty string."),

    // Check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = updateBookValidator;
