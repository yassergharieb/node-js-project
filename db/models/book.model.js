const mongoose = require("mongoose")
// const authorSchema = require("../db/models/author.model")
const bookSchema = new mongoose.Schema({

title: {type: String, 
      required: true, 
      

},

userId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User",
      required:true
},

author: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"author",
      required:true

},

description: {
    type: String,
     require:true, 
}, 
dateOfpublish:{
      type: Date,
      require: true,

},

NumberOfedition: {
      type: String, 
      required: false,
    
},
CoverImage: {
      type: String,
      required: true,
},


quantity: {
  type: Number,
  required: true,
  min: [1, "Quantity can not be less then 1."],
},
price: {
  type: Number,
  required: true,
},
total: {
  type: Number,
  required: true,
},

},

{timestamps: true}
)

const book  = mongoose.model("book" , bookSchema)

module.exports = book