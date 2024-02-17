
const 
express=require("express"),
router=express.Router(),
campground=require("../models/campgrounds"),
middleware=require("../middleware");


// action to show books mean page
exports.showBooks = (req,res)=>{
    // find the books data in database
    campground.find({},function(err,allcampgrounds){
    // if there is a error mostrar el error por consola    
        if(err){
            console.log(err);
    // if find book data send it to view books/books        
        }else{
            res.render("books/books",{campgrounds:allcampgrounds});}});}

// action to show the add_books page
exports.add_books = (req,res)=>{
    res.render("books/add_books")};



// action to send data to database and then render view to books
 exports.add_books_post = (req, res, next) => {
    let bookParams = {
        name:req.body.name,
        price:req.body.price,
        phone:req.body.phone,
        image:req.body.image,
        disc:req.body.discription,
        // get data of user to save it to book inf
        author:{
        id: req.user._id,
        username: req.user.username
    }};
    // create action new book data
    campground.create(bookParams,function(err,bookParams){
        if(err) console.log(err);
        else res.redirect("/books"); // redirect view to /books
    });
 };

// show more inf action books for id
 exports.add_books_id = ("/books/:id",(req,res)=>{
     campground.findById(req.params.id).populate("comments").exec(function(err,C){
         if(err) console.log(err);
         else {
            res.render("books/moreinfo",{C:C});
     }
     });
});
// show edit book page
exports.add_books_edit = ("/books/:id/edit",middleware.checkcampgroundownership, (req,res)=>{
    campground.findById(req.params.id,function(err,foundcampground){
    res.render("books/edit",{campground: foundcampground});
    });
 });


// send book data back to database updating data fields
// note: you need to add  methodOverride = require("method-override"), installing 
// method-override in order to achieve update(put), action
exports.add_books_update =("/books/:id",middleware.checkcampgroundownership, function(req,res){
 // get in data into a object to update it
    let bookParams = {
        name:req.body.name,
        price:req.body.price,
        phone:req.body.phone,
        image:req.body.image,
        disc:req.body.discription};

     campground.findByIdAndUpdate(req.params.id, bookParams,function(err,uc){
         if(err){
            // Back redirect: We can use this method to redirects the request back to 
            // the referrer. If no referrer is present, the request is redirected to “/” 
            // route by default.
             res.redirect("back");
         }else{
            // if update - redirect to books view
             res.redirect("/books/"+uc._id);
         }
     });
 });


//destroy books action

exports.add_books_delete = ("/books/:id",middleware.checkcampgroundownership, function(req,res){
   // find a remove book by user id and then redirect to /books
     campground.findByIdAndRemove(req.params.id,function(err){
         if(err){
             res.redirect("/books");
         }else{
             res.redirect("/books");
         }
     });
 });