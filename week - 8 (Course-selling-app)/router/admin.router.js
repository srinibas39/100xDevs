const express = require("express");
const {z} = require("zod");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt"); 
const { adminModel, courseModel } = require("../db");
const { authAdmin } = require("../middleware/admin.middleware");
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
adminRouter.post("/course", authAdmin , async(req,res)=>{
    try{
        const adminId = req.id;
        const {title,description,price,imageUrl} = req.body;

        const courseSchema = z.object({
            title:String,
            description:String,
            price:Number,
            imageUrl:String
        })

        const parsedData = courseSchema.safeParse({
            title,description,price,imageUrl
        })

        if(!parsedData.success){
            return res.json({
                message : "Invalid data"
            }).status(403)
        }

        await courseModel.create({
            ...parsedData.data,
            creatorId:adminId
        })

        res.json({
            message : "succesfully created the course"
        })

    }
    catch(err){
        res.json({
            message : "Internal server error"
        }).status(5000)
    }

})

//delete course
adminRouter.delete("/course/:courseid",authAdmin , async(req,res)=>{
    try{
        const courseId = req.params.courseid;
        const adminId = req.id
        await courseModel.deleteOne({
            creatorId:adminId,
            _id:courseId
        })

        res.json({
            message:"Course is successfully removed"
        })

    }
    catch(err){
        res.json({
            message:"Internal server error"
        }).status(500)
    }
})

//edit course content
adminRouter.put("/course/:courseId",authAdmin, async(req,res)=>{
    try{
        const adminId = req.id;
        const courseId = req.params.courseId;
        const {title,description,imageUrl,price} = req.body;

        const courseSchema = z.object({
            title:z.string(),
            description:z.string(),
            price : z.number(),
            imageUrl:z.string()
        })

        const parsedData = courseSchema.safeParse({
            title,
            description,
            imageUrl,
            price
        })

        if(!parsedData.success){
            res.json({
                message:"Invalid data"
            }).status(400)
        }

        const response = await courseModel.updateOne({
            creatorId:adminId,
            _id:courseId
        },{
            ...parsedData.data,
            creatorId:adminId
        })

        res.json({
            message:"updated the course"
        })
    }
    catch{
        res.json({
            message:"internal server error"
        }).status(403)
    }
})

//bulk courses
adminRouter.get("/course/bulk",authAdmin, async(req,res)=>{
    try{
        const adminId = req.id;
        const courses = await courseModel.find({creatorId:adminId})
        res.json({
            courses
        })
    }
    catch{
        res.status(500).json({
            message:"Internal server error"
        })
    }
})

module.exports = adminRouter

