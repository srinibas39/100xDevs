const express = require('express')
const cors = require('cors')
const app = express()
const port = 5000


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

app.post("/signin",(req,res)=>{

  const username = req.body.username;
  const password = req.body.password;

  if(username && password){
     // find user exits or not
     const user = users.find(user=>user.username === username && user.name === user.password === password);
     if(user){
       const token = generateToken();
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
        message:"Successfully signed in"
      })
    }
})


app.get('/', (req, res) => {
  res.send('Write a simple auth')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
