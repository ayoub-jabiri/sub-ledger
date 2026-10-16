export const requestBodyCheck = (req, res, next) => {
    if (!req.body) {
        return res.status(400).json({
            message: "Missing request body",
        });
    }

    next();
};
