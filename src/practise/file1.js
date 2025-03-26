const printH = require("./file2");

setTimeout(()=> {
    console.log("inside setTimeout");
}, 0);

printH();