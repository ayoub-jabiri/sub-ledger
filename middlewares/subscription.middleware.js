import { body, validationResult } from "express-validator";

export const subValidationRules = [
    body("name").notEmpty().withMessage("The name is required"),
    body("price")
        .notEmpty()
        .withMessage("The price is required")
        .isInt({ min: 0.1 })
        .withMessage("The price must greater than 0"),
    body("billingCycle")
        .isIn(["monthly", "yearly"])
        .withMessage(
            "The billing cycle is required and must be either 'monthly' or 'yearly'"
        ),
];

export const dataValidation = (req, res, next) => {
    const validation = validationResult(req);

    if (!validation.isEmpty())
        return res.status(400).json({ errors: validation.errors });

    next();
};
