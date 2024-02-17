
const 
express=require("express"),
User=require("../models/user"),
passport = require("passport"),
middleware=require("../middleware");


exports.showUsers =  (req, res)=> {
    if(req.user) {
      res.redirect("/books");
    } else {
      res.render("landing");
    }
  };

// login action
  exports.loginUsers = (req,res)=>{
    if(req.user) {
      // redirect - express function with meddleware call (req, res, next), to redirect views
      // better to use only in login action
      res.redirect("/");
    } else {
      // render - express function with not medlleware call (req,res) - use always
      res.render("users/login");
    }
  };

  // register action
  exports.registerUser=(req,res)=>{
    if(req.user) {
      res.redirect("/");
    } else {
      res.render("users/register");}};

  // register post action

  exports.registerUserPost=(req,res)=>{
    var newUser= new User({username: req.body.username});
    User.register(newUser,req.body.password,(err,user)=>
    {
          if(err){
               req.flash("error",err.message);
              res.render("register");
          }
          passport.authenticate("local")(req,res,()=>{
            req.flash("success","Welcome to Book Addicts "+ user.username);
               res.redirect("/books");
          });
    });
};

// logout action
exports.logout=(req,res)=>{
  req.logout(function (err) {
  if (err) {
    return next(err);
  } else {
          res.redirect("/books");
          req.flash("success","logged you out!");
  }
});
};
