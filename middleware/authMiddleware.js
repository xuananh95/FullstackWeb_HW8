const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send("You must login first!");
    try {
        const checkToken = jwt.verify(token, "some_secret");
        req.user = checkToken;
        next();
    } catch (e) {
        res.status(400).send("Token incorrect!");
    }
};
