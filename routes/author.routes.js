const author = require("../controller/author.controller")
const router = require("express").Router()
const {auth , adminAuth} = require("../middleware/auth.middleware")


// add author 

router.post("/addAuthor" ,adminAuth, author.addAuthor)


//  get all authors 
router.get("/allAuthors" ,author.getAllauthors)


// get single author 
router.get("/singleAuthor" , author.getSingleAuthor)


// delete author 

router.delete("/delete" , adminAuth,  author.deleteAuthor)


router.patch("/update" ,adminAuth,  author.updateAuthor)



module.exports = router