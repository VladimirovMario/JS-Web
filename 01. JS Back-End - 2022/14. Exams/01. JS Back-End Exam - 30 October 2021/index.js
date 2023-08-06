const express = require('express');

require('dotenv').config();

const expressConfig = require('./config/express');
const databaseConfig = require('./config/database');
const routesConfig = require('./config/routes');

startApp();

async function startApp() {
  const app = express();

  await databaseConfig(app);
  expressConfig(app);
  routesConfig(app);

  const port = 3000;
  app.listen(port, () =>
    console.log(
      `Server started on port ${port}. You can make requests to: \nhttp://localhost:${port}/`
    )
  );
}
