const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth");

const app=express();
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("DB Connected");
});





app.use("/api", authRoutes);
const port = process.env.PORT || 8000;
app.listen(port,()=>{
    console.log(`App is running at ${port}`);
});