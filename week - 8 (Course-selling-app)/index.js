const express = require("express");
const userRouter = require("./router/user.router");
const courseRouter = require("./router/course.router");
const adminRouter = require("./router/admin.router");
require("dotenv").config()
const mongoose = require("mongoose")
const app = express();
const port = process.env.PORT;
app.use(express.json()) //body arse

mongoose.connect(process.env.DB_URL) // db connect


app.use("/api/v1/user",userRouter);
app.use("/api/v1/course",courseRouter);
app.use("/api/v1/admin",adminRouter)

app.listen(port,()=>{
    console.log("App is listening")
})