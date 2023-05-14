1;
// const { publish } = require("./observer");

// let counter = 0;

// setInterval(() => {
//   publish("message", counter++);
// }, 2000);

2;
const { emitter } = require('./observer');

let counter = 0;

setInterval(() => {
  emitter.emit("message", counter++);
}, 2000);