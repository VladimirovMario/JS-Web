const { html } = require("../util");

function homePage(req, res) {
  res.write(html(`
       <h1>Home Page</h1>
       <p>Welcome to our site</p>`,
        "Home"));
  res.end();
}

function aboutPage(req, res) {
  res.write(html(`
      <h1>About Us</h1>
      <p>+ 359 02 ...</p>`,
       "About"));
  res.end();
}

function defaultPage(req, res) {
  res.statusCode = 404;
  res.write(html(`
      <h1>404 Not Found</h1>
      <p>The resource you requested cannot be found</p>`));
  res.end();
}

module.exports = {
  homePage,
  aboutPage,
  defaultPage
};
