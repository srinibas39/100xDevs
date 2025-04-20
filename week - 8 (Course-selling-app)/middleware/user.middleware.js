const jwt = require("jsonwebtoken")
require("dotenv").config()

const jwtSecret = process.env.JWT_SECRET_KEY_USER

function auth(req,res,next){
    try{
        const token = req.headers.authorization;
        if(!token){
            return res.json({
                message:"token does not exist"
            })  
        }

        const response = jwt.verify(token,jwtSecret)
        if(!response){
            return res.json({
                message:"token does not exist"
            })  
        }
        req.id = response.id
        next()
    }
    catch(err){
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

module.exports = {
    auth:auth
}