// const url = new URL("http://localhost:3000/catalog?page=5");
// console.log(url);
const http = require("http");
const router = require("./router");
const { catalogPage, createPage, createItem } = require("./controllers/catalogController");
const { homePage, aboutPage, defaultPage} = require("./controllers/homeController");

router.get("/", homePage);
router.get("/catalog", catalogPage);
router.get("/create", createPage);
router.post("/create", createItem);
router.get("/about", aboutPage);
router.get("default", defaultPage);

const server = http.createServer(router.match)

server.listen(3000);
