var express=require("express");
var router=express.Router();
var campground=require("../models/campgrounds");
var comment= require("../models/comment");
var middleware=require("../middleware");

// show comments action
exports.showComments =(req,res)=>{
// find comment by id and send it to add_comments view      
     campground.findById(req.params.id,(err,camp)=>{
 if(err) console.log(err);
         else{
// if find it - send it with the url resp - var camp            
                res.render("comments/add_comments",{camp});}})};

// show by id action
exports.showById = (req,res)=>{

     campground.findById(req.params.id,(err,campground)=>{
                      
        if(err) {console.log(err);}
                  
             else{
          comment.create(req.body.comment,(err,comment)=>{
        if(err) 
           {   req.falsh("error","something went wrong");
             console.log(err);}
        else{
               comment.text=req.body.text;
               comment.author.id=req.user._id;
               comment.author.username=req.user.username;
        //save comment
               comment.save();
               campground.comments.push(comment);
               campground.save((err,data)=>{
         if(err) console.log(err);
         else {
         req.flash("success","successfully added comment");
         res.redirect('/books/'+data._id);
         }}); } }); } }); };
        
// edit comments action

exports.commentsEdit=(req,res)=>{
            comment.findById(req.params.comment_id,function(err,foundcomment){
                if(err)
                {
                         res.render("back");
                }else{
                       res.render("comments/comments_edit", {camp_id: req.params.id, comment: foundcomment});
                }
            });
     };

// update comments action

exports.commentsUpdate=(req,res)=>{
        var t=req.body.text;
        var object={text:t};
         comment.findByIdAndUpdate(req.params.comment_id, object, function(err,updatedcomment){
            if(err)
            {
                res.redirect("back");
            }else{
               
                res.redirect("/books/"+ req.params.id);
            }
        });
    };

// comments destroy action

 exports.commentsDelete=(req,res)=>{
    comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err)
        {
            res.redirect("back");
        }else{
         req.flash("success","comment deleted");
            res.redirect("/books/"+req.params.id);
        }
    });
 };
 

