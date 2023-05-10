const { print, add, data } = require("./util");
const fs = require("fs");

console.log(print, add);

print("Hello world " + add(3, 5));

console.log(data[1]);

data[1] = 5;

console.log(data);

fs.writeFileSync("./output.txt", "Hello world!");
