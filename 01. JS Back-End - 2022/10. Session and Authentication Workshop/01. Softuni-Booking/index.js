const express = require("express");

const databaseConfig = require("./config/database");
const { expressConfig } = require("./config/express");
const routesConfig = require("./config/routes");

async function start() {
  const app = express();

  await databaseConfig(app);
  expressConfig(app);
  routesConfig(app);

  const port = 3000;
  app.listen(port, () =>
    console.log(`Server started on port ${port}. You can make requests to http://localhost:${port}/`)
  );
}

start();
