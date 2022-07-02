const book = require("../controller/book.controller")
const router = require("express").Router()
const uploadFile = require("../middleware/uploadFile")

const {auth , adminAuth} = require("../middleware/auth.middleware")


// add book 
router.post("/addbook", adminAuth, book.addBook)

// get all book
router.get("/allbooks" , book.getAllBooks)


// get single book
router.get("/singlebook" , book.getSingleBook)



// delete book
router.delete("/delete" , book.deleteBook)



router.patch("/profile",auth, uploadFile.single('profile'),book.uploadImage)

router.patch("/profile1",auth, uploadFile.single('profile'),book.uploadImageFile)



module.exports = router