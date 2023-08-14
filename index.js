const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const colors = require("colors");
const port = process.env.PORT || 4000;


const dbConnect = require("./config/dbConnect");
const authRoutes = require('./routes/authRoutes');
const bodyParser = require("body-parser");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

dbConnect();

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1/user', authRoutes);

app.use(notFound);
app.use(errorHandler);



app.get("/", (req, res) => {
    res.status(200).json({
        message: "RadianMart Backend is running succesfully!"
    })
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`.bgBlue);
});
