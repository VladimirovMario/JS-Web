const app = require("express")();
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const secret = "jwt usage";

app.use(cookieParser());

app.use((req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    try {
      const data = jwt.verify(token, secret);
      req.user = data;
    } catch (error) {
        
    }
  }
  next();
});

app.get("/", (req, res) => {
  console.log(req.user);
  // { username: 'Peter', role: [ 'user', 'admin' ], iat: 1666516442 }

  if (req.user) {
    res.send("Hello, " + req.user.username);
  } else {
    res.send("Hello guest");
  }
});

app.get("/jwt", (req, res) => {
  const payload = {
    username: "Peter",
    role: ["user", "admin"],
  };

  const token = jwt.sign(payload, secret);
  res.cookie("token", token);
  res.send("Token saved");
});

app.listen(3000);
