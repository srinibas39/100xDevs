const express = require("express");
const { auth } = require("../middleware/user.middleware");
const { purchaseModel, courseModel } = require("../db");
const courseRouter = express.Router();

courseRouter.get("/courses/:courseId",auth,async(req,res)=>{
    try{
        const id = req.id;
        const  courseId = req.params.courseId
    
        //integrate the payment and check if payment is made
        await purchaseModel.create({
            userId:id,
            courseId:courseId
        });
    
        res,json({
            message : "you have successfully purchased the courses"
        })
    }
    catch(e){
        res.status(500).json({
            message:"Internal server error"
        })
    }

})

courseRouter.get("/preview",async(req,res)=>{
  try{
      const allCourses =  await courseModel.find({});
      res.json({
        courses:allCourses
      })
  }
  catch(err){
    res.status(500).json({
        message:"Internal server error"
    })
  }
})


module.exports = courseRouter