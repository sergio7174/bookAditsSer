const campground=require("../models/campgrounds"),
      comment=require("../models/comment"),

  middleware={};

middleware.checkcampgroundownership=function(req,res,next){
 
    //req.isAuthenticated() will return true if user is logged in
    if(req.isAuthenticated()){
       // look for book by id from id on database
        campground.findById(req.params.id,function(err,foundcampground){
          // if not found
            if(err){
                req.flash("error","book not found");// message to show
 // Back redirect: We can use this method to redirects the request back to 
  // the referrer. If no referrer is present, the request is redirected to “/” 
  // route by default.
               
                res.redirect("back");
            // if found
            }else{
                // if database user id is equal than user id 
                if(foundcampground.author.id.equals(req.user._id)){
                   next();
                }
               else{
                req.flash("error","you don't have permission to do that");
  // Back redirect: We can use this method to redirects the request back to 
  // the referrer. If no referrer is present, the request is redirected to “/” 
  // route by default.

                   res.redirect("back");
               }
            }
        })
      }else{
  // Back redirect: We can use this method to redirects the request back to 
  // the referrer. If no referrer is present, the request is redirected to “/” 
  // route by default.

               res.redirect("back");
          
      }
 }

 middleware.checkcommentownership=function(req,res,next){
 //req.isAuthenticated() will return true if user is logged in   
    if(req.isAuthenticated()){
        // find user that add book
        comment.findById(req.params.comment_id,function(err,foundcomment){
            // if n ot found
            if(err){
  // Back redirect: We can use this method to redirects the request back to 
  // the referrer. If no referrer is present, the request is redirected to “/” 
  // route by default.

                res.redirect("back");
            // if found    
            }else{
                // data from user is equal to database user
                if(foundcomment.author.id.equals(req.user._id)){
                   next();
                }
               else{
                // data user not equal to database user - show flah message
                req.flash("error","you don't have permission to do that");
  // Back redirect: We can use this method to redirects the request back to 
  // the referrer. If no referrer is present, the request is redirected to “/” 
  // route by default.

                   res.redirect("back");
               }
            }
        })
      }else{
        req.flash("error","you need to be log in first"); // message to show
  // Back redirect: We can use this method to redirects the request back to 
  // the referrer. If no referrer is present, the request is redirected to “/” 
  // route by default.
      
          res.redirect("back");
      }
 }

 
 middleware.isLoggedIn=function(req,res,next){

  //req.isAuthenticated() will return true if user is logged in
    if(req.isAuthenticated()){
        return next(); // next(), res.render("add_books"); in main.js
    }
  // if user is not logged in -- show error and redirect to login page  
    req.flash("error","you need to be log in first");
    
    //res.redirect("/prueba");
    // Express.js res.render is used to render a view and sends the rendered HTML string to the client.
    // render - express() function, with not meddleware call (res,rep,next)
     res.render("users/login");
 }


 module.exports=middleware; 