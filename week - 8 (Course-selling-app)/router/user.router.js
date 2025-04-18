const express = require("express");
const {z} = require("zod");
const { userModel, purchaseModel, courseModel } = require("../db");
const { auth } = require("../middleware/user.middleware");
const userRouter = express.Router();

const jwtSecret = process.env.JWT_SECRET_KEY_USER;

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

userRouter.post("/signin",async(req,res)=>{
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

userRouter.get("/purchasedCourses",auth , async(req,res)=>{
    //For course purchases
    try{
        const userId = req.id
        const purchasedCourses = await purchaseModel.find({
            userId
        })

        const courseInfo = await courseModel.find({
            _id:{'$in':purchasedCourses.map(course => course.courseId)}
        })

        res.json({
            courses:courseInfo
        })
    }
    catch(e){
        res.status(500).json({
            message:"Internal server errro"
        })
    }
})

module.exports = userRouter

