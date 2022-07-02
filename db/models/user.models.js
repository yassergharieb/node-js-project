const mongoose =  require("mongoose")
const validator =  require ("validator")
const bcryptjs = require("bcryptjs")


const UserSChema  = new mongoose.Schema( {
Name: {
    type: String, 
    required: true,
    trim: true, 
    

}, 
Email: {
    type: String, 
    required: true,
    unique: true,  
    trim:true, 
    validate(value){ 
    if(!validator.isEmail(value)) throw new Error ("Email not valid")
    }
}, 
Phone: {
    type: String, 
    min: 11,
    max:11, 
    required: true, 
    trim: true, 

},
Password: {
    type: String, 
    min: 10, 
    required: true, 
    trim: true, 
    match:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

}, 
 Role: {
   type:String, 
   required: true, 
   trim: true,
   default: "user",
   enum: ["admin" , "user"]


 },  


image:{
    type:String,
    trim:true
}, 
tokens: [
    { token:
        { type:String,
          required: true} 
    }
     ]  

}, 

{timestamps: true,}



) 

UserSChema.methods.toJSON = function () {

const User =this.toObject()

delete User._v
// delete User.Password
// delete User.tokens
return User


}

UserSChema.pre("save", async function () {

const User = this
if(User.isModified("Password"))
    User.Password = await bcryptjs.hash(User.Password , 12)
    
} )


UserSChema.statics.loginUser = async(Email, Password)=>{
    const userData = await User.findOne({ Email })
    if(!userData) throw new Error("invalid email")
    const ValidPassword = await bcryptjs.compare(Password, userData.Password)
    if(!ValidPassword) throw new Error("invalid Password")
    return userData
}
const jwt = require("jsonwebtoken")
UserSChema.methods.generateToken = async function(){
    const User = this
    const token = jwt.sign({_id:User._id}, process.env.JWTKEY)
    User.tokens = User.tokens.concat({token : token})
    await User.save()
    return token
}



const User = mongoose.model("User" , UserSChema)
module.exports=User