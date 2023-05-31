const app = require("express")();
const cookieParser = require("cookie-parser");
const session = require("express-session");

// Middleware
app.use(cookieParser());
// Middleware
app.use(
  session({
    secret: "my secret code",
    resave: false,
    saveUninitialized: true,
    // When set to true must be use with https//: cookie: {secure: true }
    cookie: { secure: false },
  })
);

app.get("/", (req, res) => {
  console.log(req.session);

  req.session.message = "Hello";
  req.session.visited = (req.session.visited || 0) + 1;


  res.cookie("multipleCookies", "test");

  res.send("Hello. Visited counter: " + req.session.visited);
});

app.listen(3000);
