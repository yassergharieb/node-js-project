const express = require("express")
const bookModel = require("../db/models/book.model")
const fs = require("fs")
const path=require("path")


class book {

static addBook = async (req, res) => {
try {
    const book =  new bookModel({...req.body, userId: req.user._id,})
       await book.save()
       res.status(200).send({
        apiStatus: true,
        data: book,
        message: "book addes successfully",

       })

} catch (error) {
    res.status(500).send({
        apiStatus: false,
        data: error.message,
        message: "something wrong happend",
      });
}



}




static deleteBook = async (req, res)=> {
        
    try {
      const bookData = await bookModel.findByIdAndDelete( req.body, req.book._id)
      res.status(200).send({
        apiStatus: true, 
        data: bookData, 
        message: "book deleted"
      })
    } catch (error) {
      res.status(500).send({
        apiStatus:false, 
        error:error,
         message: error.message
      })
    }
}


static updateBook = async (req, res)=> {
  
      
    try { 
      const bookData = await bookModel.findByIdAndUpdate(req.book._id , 
      req.book.body, 
      {runValidators:true,}
       )
    res.status(200).send({
     apiStatus: true, 
     data: bookData, 
     message: "data updated"
    })
       } catch (error) {
         
         res.status(500).send({
           apiStatus:false, 
           error:error,
            message: e.message
         })
       }
}

static getAllBooks = async (req, res) => {
    try {
      const AllBooks = await bookModel.find();
      res.status(200).send({
        apiStatus: true,
        data: AllBooks,
        message: "data fethched",
      });
    } catch (error) {
      res.status(500).send({
        apiStatus: false,
        data: null,
        error: error,
        message: error.message,
      });
    }
  };

  static getSingleBook= async (req, res) => {
    try {
      const book = await bookModel.findById(req.params.id == book._id)
      if (!book) {
        res.status(404).send({
          apiStatus: false,
          data: null,
          message: "invalid book ID",
        });
      }
      res.status(200).send({
        apiStatus: true,
        data: book,
        message: "data fetched",
      });
    } catch (error) { 
      res.status(500).send({
        apiStatus: false,
        error: error,
        message: error.message,
      });
    }
  };

static uploadImage=  async(req, res)=>{
  try{
      const ext = path.extname(req.file.originalname)
      const newName = "images/"+req.file.fieldname + Date.now()+ext
      fs.rename(req.file.path, newName, ()=>{})
      req.book.image = newName
      req.book.title= req.body.title
      
      await req.user.save()
      res.send({data:req.book})
  }
  catch(e){
      res.send(e.message)
  }
}

static uploadImageFile=  async(req, res)=>{
  try{
      const oldFile = req.book.image
      req.book.image = req.file.path
      req.book.title= req.body.title
    
      await req.user.save()
      fs.unlinkSync(oldFile)
      res.send({data:req.book})
  }  
  catch(e){
      res.send(e.message)
  }
}

static profile = async (req, res) => {
  res
    .status(200)
    .send({ apiStatus: true, data: req.body, message: "data featched" });
};




}

module.exports = book