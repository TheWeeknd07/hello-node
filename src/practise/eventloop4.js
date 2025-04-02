Promise.resolve().then(() => {
    Promise.resolve("Promise 1").then(console.log);
    process.nextTick(() => console.log("nextTick"));
    console.log("nested promise");
    setTimeout(() => console.log("setTimeout inside promise"), 0);
});

// Output:
    // nested Promise
    // Promise 1
    // nextTick
    // setTimeout inside promise

// Reason of Promise 1 is executed before nextTick:
    // process.nextTick runs before normal microtasks (Promise.then).
    // Microtasks run before macrotasks (setTimeout).
    // The nextTick queue is emptied before handling other microtasks, except when a microtask is created inside another microtask (as seen here).

// Processing Macrotasks: why nextTick executed before setTimeout
    // The macrotask queue runs only after microtasks and nextTicks are cleared.
    // The setTimeout callback runs, logging "setTimeout inside promise".