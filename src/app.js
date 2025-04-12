const express = require('express');
const app = express();

app.use('/hello/123', (req, res) => {
    res.send('Hello hello hello from 123!!!');
});

app.use('/hello/:id/:uuid', (req, res) => { // it can handle request like hello/123/abc, hello/abc/123/1324, hello/abc/123/abc/123 but not requests like /hello, hello/123 
    const queryParams = req.params;
    console.log(queryParams);
    res.send('Hello hello hello from dynamic routes!!!');
});

app.use('/hello', (req, res) => {
    const queryParams = req.query;
    console.log(queryParams);
    res.send('Hello hello hello!!!');
});

app.get('/ab?c', (req, res) => { // it can handle both ab and abc request because b is optional
    res.send("handle ? request");
});

app.get('/ab+c', (req, res) => { // it can handle ab, abb, abbb, abbbbc and a...(as many number of `b` between `a` and `c`)...c requests
    res.send("handle + request");
});

app.get('/ab*c', (req, res) => { // it can handle abc, ac, abbc,  abxc and ab...(anything between `ab` and `c` even =, -, /, +, *)...c requests
    res.send("handle * request");
});

app.use((req, res) => {
    res.send('Hello from Server!!!');
});

app.listen(7777, () => {
    console.log('Server is running on port 7777');
});