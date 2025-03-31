// OUTPUT: -
    // last line of the code
    // process.nextTick
    // inner process.nextTick
    // Promise Resolved
    // Timer Expired
    // File Read CB
    // setImmediate

// When file read operation takes time then `File Read CB` will be printed first and then `setImmediate` will be printed but file reading operation do not take much time then `setImmediate` will be printed first before `File Read CB`
// here I have added the fs.open method to make some dealy such that it takes time to read the file and then `File Read CB` will be printed after `setImmediate`

// For example, on a slow system (or if reading a large file):
    // last line of the code
    // process.nextTick
    // inner process.nextTick
    // Promise Resolved
    // Timer Expired
    // setImmediate
    // File Read CB  <-- Happens later because I/O was slow

// On a fast system (or if the file is cached in memory):
    // last line of the code
    // process.nextTick
    // inner process.nextTick
    // Promise Resolved
    // Timer Expired
    // File Read CB  <-- I/O completed fast
    // setImmediate

const fs = require('fs');

setImmediate(() => {
    console.log("setImmediate");
});

setTimeout(() => {
    setTimeout(() => {
        console.log("inner Timer Expired");
    }, 0)
    console.log("Timer Expired");
}, 0);

Promise.resolve().then(() => {
    Promise.resolve().then(() => {
        console.log("Inner Promise Resolved");
    })
    console.log("Promise Resolved");
});

fs.readFile("./file.txt", "utf-8", () => {
    console.log("File Read CB");
});

process.nextTick(() => {
    process.nextTick(() => {
        console.log("inner process.nextTick");
    });
    console.log("process.nextTick");
});

console.log("last line of the code");

// Question:
    // process.nextTick callbacks have a higher priority than other asynchronous
    // operations. This means that if you have nested process.nextTick callbacks, the
    // inner process.nextTick callback will be executed before the outer async tasks.

// ChatGPT said:
    // Yes, exactly! process.nextTick() has the highest priority among asynchronous operations in Node.js. It always runs before any other tasks in the event loop phases (Timers, I/O callbacks, Check, etc.).

    // Why does nested process.nextTick() execute before other async tasks?
    // When you call process.nextTick(), it places the callback in the Next Tick Queue, which runs immediately after the current execution stack completes, before moving to the event loop phases.

    // If you nest process.nextTick(), each inner callback gets added to the Next Tick Queue before the event loop can proceed to the next phase, leading to the following execution order:

    // process.nextTick(() => {
    //     console.log("Outer process.nextTick");

    //     process.nextTick(() => {
    //         console.log("Inner process.nextTick");
    //     });
    // });

    // setTimeout(() => {
    //     console.log("setTimeout callback");
    // }, 0);

    // Execution Order
        // Outer process.nextTick
        // Inner process.nextTick
        // setTimeout callback

    // Why does this happen?
        // The first process.nextTick() executes immediately after the synchronous code.
        // The inner process.nextTick() gets queued before any other asynchronous operation.
        // The inner process.nextTick() executes before moving to the Timers phase where setTimeout resides.
        // This behavior can starve the event loop if misused, causing delays in the execution of timers, I/O operations, and setImmediate(). To avoid this, prefer Promises or avoid excessive nesting of process.nextTick().