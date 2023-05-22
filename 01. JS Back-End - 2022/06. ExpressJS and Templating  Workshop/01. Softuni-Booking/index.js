const express = require("express");

const homeController = require('./controllers/homeController')
const catalogController = require('./controllers/catalogController')
const createController = require('./controllers/createController')
const defaultController = require("./controllers/defaultController");
const defaultTitle = require("./middlewares/defaultTitle");

const app = express();

const hbs = require("express-handlebars").create({
  extname: "hbs",
});
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");

// Middleware Form data parser: FUNCTION
app.use(express.urlencoded({extended: false}))
// Serving static files
app.use('/static', express.static('static'))
// Middleware
app.use(defaultTitle('SoftUni Accommodation'))


app.use(homeController)
app.use('/catalog', catalogController)
app.use('/create', createController)
app.all('*', defaultController)

/* Attaching middleware only for current controller.
app.use('/create',defaultTitle('SoftUni Accommodation'), createController)
*/

const port = 3000;
app.listen(port);
console.log(`Server started on port ${port}. You can make requests to http://localhost:${port}/`);

