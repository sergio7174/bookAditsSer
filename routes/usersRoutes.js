const 
express=require("express"),
router=express.Router(),
passport=require("passport"),
usersController = require("../controllers/usersController"),
User=require("../models/user");

router.get("/users", usersController.showUsers);
router.get("/login", usersController.loginUsers);
router.post("/login",passport.authenticate("local",{
  successRedirect:"/books",
  failureRedirect:"/login" }) ,(req,res)=>{});
router.get("/register", usersController.registerUser);
router.post("/register", usersController.registerUserPost);
router.get("/logout", usersController.logout);

module.exports = router;