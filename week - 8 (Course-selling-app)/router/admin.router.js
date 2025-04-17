const express = require("express");
const {z} = require("zod");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt"); 
const { adminModel } = require("../db");
const adminRouter = express.Router();

const jwtSecret = process.env.JWT_SECRET_KEY_ADMIN

adminRouter.post("/signup",async(req,res)=>{
    try{
        const adminSchema = z.object({
            email:z.string().email(),
            password:z.string().min(3).max(100),
            firstName:z.string(),
            lastName:z.string()
        })

        const parsedData = adminSchema.safeParse(req.body);
        if(parsedData.success){
            const hashedPassword = await bcrypt.hash(parsedData.data.password,10);
            await adminModel.create({
                ...parsedData.data,
                password:hashedPassword
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

adminRouter.post("/signin",async(req,res)=>{
    try{
        const adminSchema = z.object({
            email:z.string().email(),
            password:z.string().min(3).max(100)
        })

       const parsedUser =  adminSchema.safeParse(req.body);
       if(!parsedUser.success){
            return res.json({
                message:"unable to authenticate"
            }).status(403)
       }
       else{
           const admin = await adminModel.findOne({email})
           if(!admin){
              return res.json({
                 message:"user not present"
              }).status(403)
           }
           //password check
           const passwordMatch = await bcrypt.compare(password,admin.password)
           if(!passwordMatch){
              return res.status(403).json({
                message:"password does not match"
              })
           }
           const token = jwt.sign({
             ...parsedUser.data,
           },jwtSecret)
           res.json({
             token
           })

       }
    }
    catch(err){
        res.status(500).json({
            message:"internal server error"
        })
    }
})

//create course
adminRouter.post("/course",(req,res)=>{

})

//delete course
adminRouter.delete("/course",(req,res)=>{

})

//edit course content
adminRouter.put("/couse",(req,res)=>{

})

module.exports = adminRouter

