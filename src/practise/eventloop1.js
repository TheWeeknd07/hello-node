// OUTPUT: -
    // last line of the code
    // 1st process.nextTick
    // Promise Resolved
    // Timer Expired
    // File Read
    // 2nd process.nextTick
    // setImmediate
    // 2nd setImmediate
    // 2nd Timer

// initially the event loop starts executing callbacks from timer phase but when all the callbacks are executed(means all callback queues are empty) and callstack is empty(means all sync code execution completed) then the event loop waits at poll phase for next callback to execute


const fs = require('fs');

setImmediate(() => {
    console.log("setImmediate");
});

setTimeout(() => {
    console.log("Timer Expired");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise Resolved");
});

fs.readFile("./file.txt", "utf-8", () => {
    setTimeout(() => {
        console.log("2nd Timer")
    }, 0);

    process.nextTick(() => {
        console.log("2nd process.nextTick");
    });

    setImmediate(() => {
        console.log("2nd setImmediate");
    })
    console.log("File Read");
});

process.nextTick(() => {
    console.log("1st process.nextTick");
});

console.log("last line of the code");

