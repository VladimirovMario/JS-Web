const express = require("express");

const homeController = require('./controllers/homeController');
const aboutController = require('./controllers/aboutController');
const detailsController = require('./controllers/detailsController');
const createController = require('./controllers/createController');
const defaultController = require("./controllers/defaultController");
const defaultTitle = require("./middleware/defaultTitle");

const env = process.env.NODE_ENV || "development";
const config = require("./config/config")[env];

const app = express();

const handlebars = require('express-handlebars').create({
    extname : 'hbs'
})
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');

// Middleware Form data parser
app.use(express.urlencoded({extended: false }));
// Serving static files
app.use('/static', express.static('static'));
// Middleware
app.use(defaultTitle('World of Cubes'));

app.use(homeController);
app.use('/about', aboutController);
app.use('/details', detailsController);
app.use('/create', createController);
app.all('*', defaultController);

app.listen(config.port, console.log(`Server started on port ${config.port}`));
