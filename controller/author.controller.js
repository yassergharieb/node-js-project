const express = require("express")
const authorModel = require("../db/models/author.model")
const fs = require("fs")
const path=require("path")

class Author {

static addAuthor = async(req, res) => {
              try {
                  const author = new authorModel({...req.body, userId: req.user._id})
                  await author.save()
                  res.status(200).send({
                      apiStatus: true, 
                      data: author, 
                      messege: "Author addedd"
                  })
              } catch (error) {
                  res.status(500).send({
                  apiStatus: false, 
                  data: error,
                  messege: "Error try again"
                  })
              }

}



static deleteAuthor = async (req, res)=> {
        
    try {
      const authorData = await authorModel.findByIdAndDelete(req.params.id)
      res.status(200).send({
        apiStatus: true, 
        data: authorData, 
        message: "auhtor deleted"
      })
    } catch (error) {
      res.status(500).send({
        apiStatus:false, 
        error:error,
         message: error.message
      })
    }
}


static updateAuthor = async (req, res)=> {
  
      
    try { 
      const authorData = await authorModel.findByIdAndUpdate(req.params.id , 
      req.body.id, 
      {runValidators:true,}
       )
    res.status(200).send({
     apiStatus: true, 
     data: authorData, 
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

static getAllauthors = async (req, res) => {
    try {
      const AllauthorS = await authorModel.find();
      res.status(200).send({
        apiStatus: true,
        data: AllauthorS,
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

  static getSingleAuthor = async (req, res) => {
    try {
      const author = await authorModel.findById(req.params.id)
      if (!author) {
        res.status(404).send({
          apiStatus: false,
          data: null,
          message: "invalid author ID",
        });
      }
      res.status(200).send({
        apiStatus: true,
        data: user,
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
        req.author.image = newName
        req.author.name= req.body.name
     
        await req.author.save()
        res.send({data:req.author})
    }
    catch(e){
        res.send(e.message)
    }
  }
  
  static uploadImageFile=  async(req, res)=>{
    try{
        const oldFile = req.author.image
        req.authoe.image = req.file.path
        req.author.name= req.body.name
      
        await req.user.save()
        fs.unlinkSync(oldFile)
        res.send({data:req.author})
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


module.exports = Author


