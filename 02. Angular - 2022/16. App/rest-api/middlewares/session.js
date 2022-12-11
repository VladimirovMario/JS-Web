const { parseToken } = require("../services/userService");

module.exports = () => (req, res, next) => {
    
    const token = req.headers["x-authorization"];
    if (token) {
      try {
        const payload = parseToken(token);
        req.user = payload;
        req.token = token;
        sessionStorage.setItem("token", token);
      } catch (err) {
        return res.status(401).json({ message: "Invalid authorization token" });
      }
    }
/*
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    try {
      const bearer = bearerHeader.split(` `);
      const bearerToken = JSON.parse(bearer[1])["token"];
      const payload = parseToken(bearerToken);
      req.user = payload;
      req.token = bearerToken;
      //   console.log(req.headers);
    } catch (err) {
      return res.status(401).json({ message: "Invalid authorization token" });
    }
  }
*/
  next();
};
