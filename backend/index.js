const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/about", (req, res) => {
    res.send("This tells you about the website");
});

app.post("/test", (req, res) => {
    console.log(req)
});

app.listen(3000,() => console.log("Server listening at port 3000"));
