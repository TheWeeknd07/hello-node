setTimeout(() => {
    setTimeout(() => console.log("nested setTimeout"), 0);
    Promise.resolve().then(() => console.log("Promise inside setTimeout"));
    console.log("setTimeout");
}, 0);

// Output:
// setTimeout
// nested setTimeout
// Promise inside setTimeout

// Execution Order Summary
    // -> First macrotask (setTimeout fires)
    // -> Logs "setTimeout"
    // -> Schedules "Promise inside setTimeout" (microtask)
    // -> Schedules "nested setTimeout" (macrotask)
    // -> Microtasks execute before handling the next macrotask
    // -> Logs "Promise inside setTimeout"
    // -> Next macrotask (nested setTimeout fires)
    // -> Logs "nested setTimeout"

// Key Takeaways
    // Microtasks (Promise.then(...)) run before the next macrotask (setTimeout).
    // Each setTimeout callback is a separate macrotask.
    // Microtasks are always processed between macrotasks.

// ***Each `setTimeout` callback is a separate macrotask.**
    // Do you mean its not like recursive Promise chain or recursive nextTick?
// ChatGPT said:
    // Yes, exactly! Unlike a recursive Promise chain or recursive process.nextTick,
    // where each callback schedules the next microtask before the event loop moves on,
    // multiple setTimeout calls do not form a continuous synchronous execution chain.
    // Instead, each setTimeout callback is placed in the macrotask queue and
    // will only execute after all microtasks and previous macrotasks have been processed.    

