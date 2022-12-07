const { parseToken } = require('../services/userService');


module.exports = () => (req, res, next) => {
    // const token = req.headers['x-authorization'];
    const token = req.cookies.token;

    if (token) {
        try {
            const payload = parseToken(token);
            req.user = payload;
            req.token = token;
        } catch (err) {
            res.clearCookie("token");
            return res.status(401).json({ message: 'Invalid authorization token'});
        }
    }

    next();
};