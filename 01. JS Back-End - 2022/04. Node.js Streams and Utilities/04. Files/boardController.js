const { createReadStream, promises: fs } = require("fs");

async function homePage(req, res) {
  res.writeHead(200, {
    "Content-type": "text/html",
  });

  const layout = await fs.readFile("./static/index.html");
  res.write(
    layout.toString().replace("<%%imageboard%%>", await getImageList())
  );
  res.end();
}

function sendFile(req, res) {
  let content = req.url.split(".");

  if (req.url == "/style.css") {
    res.writeHead(200, {
      "Content-type": `text/${content[1]}`,
    });

    createReadStream("./static/style.css").pipe(res);
  } else {
    const filename = "." + req.url;

    res.writeHead(200, {
      "Content-type": `text/${content[1]}`,
    });
    createReadStream(filename).pipe(res);
  }
}

async function getImageList() {
  const files = await fs.readdir("./img");

  return `<ul>${files.map(imageCard)}</ul>`;
}

function imageCard(imgName) {
  return `<li><img src="./img/${imgName}" alt="cat.png"></li>`;
}

module.exports = {
  homePage,
  sendFile,
};
