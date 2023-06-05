const { verifyToken } = require("../services/userService");
// TODO remove clg
module.exports = () => (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    try {
      const userData = verifyToken(token);
      req.user = userData;
      res.locals.username = userData.username
      
      console.log(">>> From Session userData: >>>", userData);

    } catch (error) {
      res.clearCookie("token");
      console.log("Cookie cleared");
      return res.redirect("/auth/login");
    }
  }
  next();
};
