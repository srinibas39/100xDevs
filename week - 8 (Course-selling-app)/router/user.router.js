const express = require("express");
const {z} = require("zod");
const { userModel } = require("../db");
const userRouter = express.Router();

userRouter.post("/signup",async(req,res)=>{
    try{
        const userSchema = z.object({
            email:z.string().email(),
            password:z.string().min(3).max(100),
            firstName:z.string(),
            lastName:z.string()
        })

        const parsedData = userSchema.safeParse(req.body);
        if(parsedData.success){
           
            await userModel.create({
                ...parsedData.data
            })

            res.json({
                message:"successfully signed up"
            })
        }
        else{
            res.json({
                message:"Unable to authenticate"
            }).status(403)
        }
    }
    catch(e){
        res.json({
            message:"Internal Server error"
        }).status(500)
    }
})

userRouter.post("/signin",(req,res)=>{
    
})

userRouter.get("/purchasedCourses",(req,res)=>{
    //For course purchases
})

module.exports = userRouter

