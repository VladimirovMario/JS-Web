1;
// const subscribers = {};

// function subscribe(type, callback) {
//     console.log('new subscriber for ' + type);

//   if (subscribers[type] == undefined) {
//     subscribers[type] = [];
//   }
//   subscribers[type].push(callback);
// }

// function publish(type, data) {
//     console.log('---');
//     console.log('received ' + type);

//   const currSubscribers = subscribers[type];

//   if (currSubscribers) {
//     for (const subscriber of currSubscribers) {
//       subscriber(data);
//     }
//   }
// }

// module.exports = {
//     subscribe,
//     publish
// }

2;
// Events are not asynchronous
const { EventEmitter } = require('events')

const emitter = new EventEmitter()

module.exports = {
    emitter
}
