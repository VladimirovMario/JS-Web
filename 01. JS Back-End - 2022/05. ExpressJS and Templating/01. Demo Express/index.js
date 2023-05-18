const express = require("express");
const catalogController = require("./catalogController");
const createController = require("./createController");
const logger = require("./logger");

const app = express();

app.use("/static", express.static("public"));

app.use(express.static("public"));
// 0/Screenshot_4.png

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.get("/img", (req, res) => {
  res.sendFile(__dirname + "/Screenshot_5.png");
  // res.download(__dirname + "/Screenshot_4.png");
});

app.use(logger());
app.use("/create", createController);
app.use("/catalog", catalogController);

app.get("/data", (req, res) => {
  res.json([
    {
      name: "Peter",
      age: 25,
    },
    {
      name: "John",
      age: 32,
    },
  ]);
});

app.all("*", (req, res) => {
  res.status(404).send("404 Not found (custom page)");
});

app.listen(3000);
