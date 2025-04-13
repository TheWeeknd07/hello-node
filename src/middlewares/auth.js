const adminAuth = (req, res, next) => {
    console.log("middleware for authorization of admin routes");
    const token = "xyz";
    const authorized = token === "xyz";
    if(authorized) {
        next();
    } else{ 
        res.status(401).send("Unauthorized");
    }
}

const userAuth = (req, res, next) => {
    console.log("middleware for authorization of user routes");
    const token = "xyz";
    const authorized = token === "xyz";
    if(authorized) {
        next();
    } else{ 
        res.status(401).send("Unauthorized");
    }
}

module.exports = { 
    adminAuth,
    userAuth
}