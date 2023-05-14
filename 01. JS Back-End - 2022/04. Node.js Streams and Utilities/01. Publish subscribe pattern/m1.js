1;
// const { subscribe } = require('./observer')

// subscribe('message',  (data) =>{
//     console.log('module 1 received data', data);
// })

2;
const { emitter } = require('./observer');

emitter.on('message',  (data) =>{
    console.log('module 1 received data', data);
})