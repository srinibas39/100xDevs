
const express = require("express");
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const {z} = require("zod")
const { UserModel, TodoModel } = require("./db");
require("dotenv").config()
const jwt = require("jsonwebtoken");
const { auth } = require("./auth");
const app = express();
const port = process.env.PORT
const jwtSecret = process.env.JWT_SECRET


app.use(express.json())

mongoose.connect(process.env.DB_URL)

const passwordSchema = z.string().min(8, "Password must be at least 8 characters")
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter"
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter"
  })
  .refine((val) => /\d/.test(val), {
    message: "Password must contain at least one number"
  })
  .refine((val) => /[^A-Za-z0-9]/.test(val), {
    message: "Password must contain at least one special character"
  });

  const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, {
    message: "Invalid ObjectId format",
  });

app.post("/signup",async(req,res)=>{
    try{
        const userSchema = z.object({
            name:z.string(),
            email:z.string().min(3).max(100).email(),
            password:passwordSchema
        })
        const parsedData = userSchema.safeParse(req.body)
        if(!parsedData.success){
            return res.json({
                message:"Incorrect req body"
            })
        }
        else{
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

        }

    }
    catch(err){
        res.status(500).json({
            message:"Error while signing up"
        })
    }

})

app.post("/login",async(req,res)=>{
    try{
        const requestSchema = z.object({
            email:z.string().min(3).max(100).email(),
            password:passwordSchema
        })

        const parsedData = requestSchema.safeParse(req.body)

        if(!parsedData.success){
            return res.json({
                message:"Incorrect data format"
            })
        }
        else{
          
                // const email = req.body.email;
                //  const password = req.body.password
                  const {email , password} = parsedData.data
      
                    const user = await UserModel.findOne({
                        email
                    })


                    if (!user) {
                        return res.status(404).json({
                          message: "User not found"
                        });
                      }
                 
                    const passwordMatch = await bcrypt.compare(password,user.password)
                 
                    if(passwordMatch){
                    
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
              

        }
    catch(err){
        res.status(500).json({
            message:err
        })
    }
})

//authenticated

app.post("/todos",auth,async(req,res)=>{
    try{
        const userId = req.userId;
        const title = req.body.title;
        const done = req.body.done;
        const requestSchema = z.object({
            userId:z.string(),
            title:z.string(),
            done:z.boolean()
        })
        const parsedData = requestSchema.safeParse({
            userId,title,done
        })
        console.log(parsedData)
        if (parsedData.success){
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
        else{
            res.json({
                message:"Incorrect data format"
            })
        }
    }
    catch(e){
       res.status(500).json({
        message:"Error While creating todo"
       })
    }
    
})

app.get("/todos",auth , async(req,res)=>{
    try{
        const userId = req.userId;
        const response = await TodoModel.find({
            userId
        })
    
        res.json({
            todos:response
        })

    }
    catch(err){
        res.status(500).json({
            message:"Error while fetching todo"
        })
    }
})  

app.get("/",(req,res)=>{
    res.json({
        message:"Hello world"
    })
})

app.listen(port,()=>{
    console.log("Listening ot the port")
})