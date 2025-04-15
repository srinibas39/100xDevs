const express = require("express");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { UserModel, TodoModel } = require("./db");
require("dotenv").config()
const jwt = require("jsonwebtoken");
const { auth } = require("./auth");
const app = express();
const port = process.env.PORT
const jwtSecret = process.env.JWT_SECRET

app.use(express.json())

mongoose.connect(process.env.DB_URL)

app.post("/signup",async(req,res)=>{
    const name = req.body.name;
    const email = req.body.email
    const password = req.body.password;

    const hashedPassword = await bcrypt.hash(password,10) //password , salt


    if(name && hashedPassword){
        await UserModel.create({
             name,
             email,
             password:hashedPassword
        })

        res.json({
            message:"You are successfully signed in"
        })
    }

})

app.post("/login",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password

    if(email && password){
        const user = await UserModel.findOne({
            email
        })
     
        const passwordMatch = await bcrypt.compare(password,user.password)
        if(user && passwordMatch){
            const token = await jwt.sign({
                id:user._id.toString()
            },jwtSecret);
    
            res.json({
                token
            })

        }
        else{
            res.json({
                message:"passwords does not match"
            })
        }
    }
    else{
        res.json({
            message:"Invalid credentials"
        })
    }
})

//authenticated

app.post("/todos",auth,async(req,res)=>{
    try{
        const userId = req.userId;
        const title = req.body.title;
        const done = req.body.done;
        if (userId && title && typeof done === "boolean"){
             await TodoModel.create({
             userId,
             title,
             done
           }) 
  
          //  console.log("res",res)
     
           res.json({
              message:"todo is created"
           })
        }
    }
    catch(e){
        console.log(e)
    }
    
})

app.get("/todos",auth , async(req,res)=>{
    const userId = req.userId;
    const response = await TodoModel.find({
        userId
    })

    res.json({
        todos:response
    })
})  

app.get("/",(req,res)=>{
    res.json({
        message:"Hello world"
    })
})

app.listen(port,()=>{
    console.log("Listening ot the port")
})