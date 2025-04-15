const express = require("express");
const { UserModel } = require("./db");
require("dotenv").config()
const app = express();
const port = process.env.PORT

app.use(express.json())

mongoose.connect(process.env.DB_URL)

app.post("/signup",async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email
    const password = req.body.password;

    if(name && password){
        await UserModel.create({
             name,
             email,
             password
        })

        res.json({
            message:"You are successfully signed in"
        })
    }

})

app.post("/login",(req,res)=>{

})

//authenticated

app.post("/todos",(req,res)=>{

})

app.get("/todos",(req,res)=>{

})

app.get("/",(req,res)=>{
    res.json({
        message:"Hello world"
    })
})

app.listen(port,()=>{
    console.log("Listening ot the port")
})