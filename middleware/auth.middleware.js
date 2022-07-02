const jwt = require("jsonwebtoken")
const userModel = require("../db/models/user.models")

const auth = async(req ,res , next) => {
           try {
            const token = req.header("Authorization")  
            const decodedToken =  jwt.verify(token , process.env.JWTKEY)
            const userData = await userModel.findOne({_id:decodedToken._id ,'tokens.token': token})
            if (!userData) throw new Error ("invalid token")
            req.user = userData
            req.token = token
            next()

           } catch (error) {
               res.status(500).send({
                apiStatus:false,
                error: error.message,
                message:"unauthorized"
            })
           }
         
}


const  adminAuth = async(req ,res , next) => {
    try {
     const token = req.header("Authorization")  
     const decodedToken =  jwt.verify(token , process.env.JWTKEY)
     const userData = await userModel.findOne({_id:decodedToken._id ,'tokens.token': token})
     if (!userData) throw new Error ("invalid token")
     req.user = userData
     req.token = token
     next()

    } catch (error) {
        res.status(500).send({
         apiStatus:false,
         error: error.message,
         message:"unauthorized"
     })
    }
  
}
module.exports = {adminAuth , auth}