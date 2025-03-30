const fs = require('fs');

const a = 100;
setImmediate(() => {
   console.log('setImmediate'); 
});

fs.readFile("./file1.js", "utf-8", () => {
    console.log('readFile');
});

setTimeout(() => {
    console.log('Time finished');
}, 0);

process.nextTick(() => {
    console.log('process.nextTick');
});

function printA() {
    console.log("a = ", a);
}

printA();
console.log("last line of the code");