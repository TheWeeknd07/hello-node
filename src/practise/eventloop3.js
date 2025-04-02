// promise queue -> 
// nextTick queue -> 
// setTimeout queue ->

var a = 10;
console.log("a = ", a);

Promise.resolve("Promise").then(console.log);
Promise.resolve().then(() => {
    Promise.resolve("Promise 1").then(console.log);
    process.nextTick(() => console.log("nextTick"));
    console.log("nested promise");
    setTimeout(() => console.log("setTimeout inside promise"), 0);
});

process.nextTick(() => {
    process.nextTick(() => console.log("nextTick 2"));
    console.log("nextTick 1");
});

setTimeout(() => {
    console.log("setTimeout");
    setTimeout(() => console.log("setTimeout nested"), 0);
    Promise.resolve("Promise inside the setTimeout").then(console.log);
});

console.log("last line of the code");

// Output:
// a = 10
// last line of the code
// nextTick 1
// nextTick 2
// Promise
// nested Promise
// Promise 1
// nextTick
// setTimeout
// Promise inside the setTimeout
// setTimeout inside promise
// setTimeout nested