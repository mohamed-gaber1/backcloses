const jwt = require("jsonwebtoken");

const optionalAuthentication = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // مفيش Token
    if (!authHeader) {
        return next();
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (err) {
        return res.status(401).json({
            status: "fail",
            message: "Invalid token"
        });
    }
};

module.exports = optionalAuthentication;