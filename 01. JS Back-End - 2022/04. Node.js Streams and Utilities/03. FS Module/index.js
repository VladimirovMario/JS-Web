const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  if (req.method == "GET") {
    let path = req.url;
    if (path == "/") {
        path = "/index.html";
    }

    let content = path.split('.')
    
    1;
    fs.stat(`./static${path}`, (err, stat) => {
      if (err != null || stat.isFile() != true) {
        res.writeHead("404");
        res.write("404 Not Found");
        res.end();
      } else {
        res.writeHead(200, {
           "Content-Type": `text/${content[1]}`,
        });
        fs.createReadStream(`./static${path}`).pipe(res);
      }
    });
    2;
    // if (req.url == "/index.html") {

    2.1;
    //   fs.readFile("./static/index.html", (err, file) => {
    //     res.writeHead(200, {
    //       "Content-Type": "text/html",
    //     });

    //     res.write(file);
    //     res.end();
    //   });
    2.2;
    //  const fileStream = fs.createReadStream("./static/index.html");
    //   res.writeHead(200, {
    //     "Content-Type": "text/html",
    //   });

    //   fileStream.on("data", (chunk) => res.write(chunk));
    //   fileStream.on("end", () => res.end());
    2.3;
    //   res.writeHead(200, {
    //     "Content-Type": "text/html",
    //   });
    //   fs.createReadStream("./static/index.html").pipe(res);
    2;
    // } else {
    //   res.writeHead("404");
    //   res.write("404 Not Found");
    //   res.end();
    // }
  } else if (req.method == "POST") {
    const body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const result = JSON.parse(body.join(""));
      console.log(result);

      result.count++;

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      res.write(JSON.stringify(result));
      res.end();
    });
  }
});

server.listen(3000);
