const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken');
const app = express()
const port = 5000
const JWT_SECRET = "jwt_secret1234"


app.use(express.json());
app.use(cors())

//two endpoint

//db
const users = [];

//utils
function generateToken(){
  let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  let token=""
  for(let i=0;i<=32;i++){
    token+=options[Math.floor(Math.random() * options.length)] 
  }
  return token;
}

function auth(req,res,next){
    const token = req.headers.authorization;
    console.log("token",token)
    if(token){
      const user  = jwt.verify(token,JWT_SECRET , (err,decoded)=>{
          if(err){
             res.status(401).json({
                message:"Unauthorized"
             })
          }
          else{
              req.user = decoded
              next()
          }
      });

    }
    else{
      res.json({
        message:"Unauthorized"
      })
    }
}

//to host public file

app.get("/",(req,res)=>{
   res.sendFile(__dirname+"/public/index.html");
})


app.post("/signin",(req,res)=>{

  console.log("users",users)

  const username = req.body.username;
  const password = req.body.password;

  if(username && password){
     // find user exits or not
     const user = users.find(user=>user.username === username && user.password === password);
     if(user){
      //  const token = generateToken();
      
      //jwt token
      const token = jwt.sign({
         username:username
      },JWT_SECRET)

       user.token = token
       res.json({
        token
       })
     }
     else{
      res.status(403).json({
        msg:"Token not found"
      })
     }
  }
    
})

app.post("/signup",(req , res)=>{
    const username = req.body.username;
    const password = req.body.password;

    if(username && password){
      users.push({
        username,
        password
      })

      res.json({
        message:"Successfully signed up"
      })
    }
})

//now creating an endpoint --> to access this endpoint you need token
app.get("/user",auth,(req,res)=>{
    // const token  = req.headers.authorization;
    // // const user = users.find(user => user?.token === token);
    // const user = jwt.verify(token , JWT_SECRET);

    // const username = user.username;

    const user = req.user

    console.log(user)


    if(user){
      res.json({
         username : user.username
      })
    }
    else{
      res.status(401).json({
         message:"Unauthrized"
      })
    }
})


app.get('/', (req, res) => {
  res.send('Write a simple auth')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
