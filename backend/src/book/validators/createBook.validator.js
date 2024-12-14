const { body, validationResult } = require("express-validator");

const createBookValidator = [
    body("categoryId")
        .notEmpty().withMessage("categoryId is required.")
        .bail()
        .isMongoId().withMessage("categoryId must be a valid ObjectId."),
    
    body("name")
        .notEmpty().withMessage("Book name is required.")
        .bail()
        .isString().withMessage("Book name must be a string."),
    
    body("author")
        .optional()  // Not required, but if provided must be a string
        .isString().withMessage("Author name must be a string."),
    
    // Check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = createBookValidator;
