const { verifyToken } = require("../services/userService");
// TODO remove console.log
module.exports = () => (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const userData = verifyToken(token);
      req.user = userData;
      res.locals.username = req.user.username

      console.log(">>> From middlewares session (req.user = userData) >>>", userData);
   
    } catch (error) {
      res.clearCookie("token");
      console.log("Cookie cleared");
      return res.redirect("/auth/login");
    }
  }
  next();
};
