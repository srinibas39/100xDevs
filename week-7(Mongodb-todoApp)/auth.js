const jwt = require("jsonwebtoken")

const jwtSecret = process.env.JWT_SECRET

function auth(req,res,next){
    const token = req.headers.authorization;
    const response = jwt.verify(token,jwtSecret)
    if(response){
       req.userId = response.userId
       next() 
    }
    else{
        res.json({
            message:"Invalid token"
        }).status(403)
    }
}

module.exports = {
    auth,
    JWT_SECRET
}