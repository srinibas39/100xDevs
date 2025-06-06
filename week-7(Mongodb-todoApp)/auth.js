const jwt = require("jsonwebtoken")
require("dotenv").config()

const jwtSecret = process.env.JWT_SECRET

function auth(req,res,next){
    console.log(jwtSecret)
    const token = req.headers.authorization;
    const response = jwt.verify(token,jwtSecret)
    if(response){
       req.userId = response.id
       next() 
    }
    else{
        res.json({
            message:"Invalid token"
        }).status(403)
        return;
    }
}

module.exports = {
    auth,
    jwtSecret
}