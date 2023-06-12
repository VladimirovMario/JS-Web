const { verifyToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const userData = verifyToken(token);
      req.user = userData;
      res.locals.username = req.user.username;
    } catch (error) {
      res.clearCookie("token");
      console.log("Cookie cleared");
      return res.redirect("/auth/login");
    }
  }
  next();
};
