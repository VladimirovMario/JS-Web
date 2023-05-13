const routes = {};

function register(method, path, handler) {
  if (routes[path] == undefined) {
    routes[path] = {};
  }
  routes[path][method] = handler;
}

function match(req, res) {
  // console.log(routes);
  // {
  //   '/': { GET: [Function: homePage] },
  //   '/catalog': { GET: [Function: catalogPage] },
  //   '/create': { GET: [Function: createPage], POST: [Function: createItem] },
  //   '/about': { GET: [Function: aboutPage] },
  //   default: { GET: [Function: defaultPage] }
  // }
  console.log(`---`);
  console.log(">>> ", req.method, req.url);

  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log(url);

  let handler;
  const action = routes[url.pathname];

  if (action != undefined) {
    handler = action[req.method];
  }

  if (typeof handler == "function") {
    handler(req, res);
  } else {
    routes.default["GET"](req, res);
  }
}

module.exports = {
  register,
  get: register.bind(null, "GET"),
  post: register.bind(null, "POST"),
  match,
};
