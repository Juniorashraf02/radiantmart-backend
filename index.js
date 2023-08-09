const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT || 4000;


const dbConnect = require("./config/dbConnect");

dbConnect();

app.get("/", (req, res) => {
    res.status(200).json({
        message: "RadianMart Backend is running succesfully!"
    })
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`.bgBlue);
});
