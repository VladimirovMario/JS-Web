1;
// const { subscribe } = require('./observer')

// let runningTotal = 0;

// subscribe('message' , (data)=> {
//     runningTotal += data
//     console.log('Current running total is ' , runningTotal);
// })

2;
const { emitter } = require('./observer');

let runningTotal = 0;

emitter.on('message' , (data)=> {
    runningTotal += data
    console.log('Current running total is ' , runningTotal);
})