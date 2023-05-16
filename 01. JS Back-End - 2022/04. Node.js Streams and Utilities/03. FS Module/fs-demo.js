1; // with callback
// const fs = require('fs');
// fs.readFile('./demo.txt', 'utf8' , (err, data)=> {
//     if (err != null){
//       return   console.log(err.message);
//     }
//     console.log(data.toString());
// })

2; // with promises
// const fs = require('fs').promises;
// start()
// async function start() {
//     const data = await fs.readFile('./demo.txt', 'utf8' )
//     console.log(data.toString());
// }

3;
const fs = require("fs");

const result = fs.readdirSync(".");
// console.log(result);
// [ 'demo.txt', 'fs-demo.js', 'index.js', 'src' ]

const output = [];

for (const item of result) {
  if (fs.statSync(`./${item}`).isDirectory()) {
    // console.log(item, "is directory");
    output.push(item + " is directory")
  } else {
    // console.log(item, "is file");
    output.push(item + " is file")
  }
  /*
demo.txt is file
fs-demo.js is file
index.js is file
src is directory*/
}

fs.writeFileSync('./summary.txt', output.join('\n'))

const input = fs.readFileSync('./summary.txt')

console.log(input.toString());
/*
demo.txt is file
fs-demo.js is file
index.js is file
src is directory
summary.txt is file*/