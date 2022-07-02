const user = require("../controller/user.controller")
const router = require("express").Router()
const {auth , adminAuth} = require("../middleware/auth.middleware")
const uploadFile = require("../middleware/uploadFile")

// add user for admin and user
router.post("/adminregister" , user.admminRegister)
router.post("/adduser" , user.userRegister)
router.post("/login" , user.login)
// get single user 
router.get("/alluser/:id" , user.getSingleUser)
// get all user
router.get("/alluser" , user.getAllUsers)
// delete user 
router.delete("/delete/:id" , user.deleteUser)
// update user
router.patch("/update" , user.updateUser )

router.patch("/logout" ,  user.logout)
router.patch("/logoutAll", user.logoutAll)
router.patch("/changePassword" , user.updatePassword)



router.patch("/profile",auth, uploadFile.single('profile'),user.uploadImageFIRST)

router.patch("/profile1",auth, uploadFile.single('profile'),user.uploadImageNEW)



module.exports = router