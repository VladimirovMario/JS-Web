const jwt = require("jsonwebtoken");

module.exports = (jwtSecret) => (req, res, next) => {
  const token = req.cookies.jwt;
  
  console.log('>>> From MIDDLEWARE AUTH req.cookies: >>>', req.cookies);
 
  if (token) {
    try {
      const data = jwt.verify(token, jwtSecret);
      req.user = data;
      
      console.log('>>> From MIDDLEWARE AUTH req.user: >>>', req.user);
      
    } catch (error) {
      res.cookie("jwt", "", { maxAge: 0 });
      return res.redirect("/auth/login");
    }
  }

  req.signJwt = (data) => jwt.sign(data, jwtSecret, {
    expiresIn: '1d'
  })
  next();
};
