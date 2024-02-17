const express=require("express"),
      router=express.Router(),
      campground=require("../models/campgrounds"),
      comment= require("../models/comment"),
      middleware=require("../middleware"),
      commentsController = require("../controllers/commentsController");

/****comments routes********/
router.get("/books/:id/comments/new", middleware.isLoggedIn, commentsController.showComments); 
router.post("/books/:id/comments", middleware.isLoggedIn, commentsController.showById);
router.get("/books/:id/comments/:comment_id/edit",middleware.checkcommentownership, commentsController.commentsEdit);
router.put("/books/:id/comments/:comment_id",middleware.checkcommentownership,commentsController.commentsUpdate);
router.delete("/books/:id/comments/:comment_id/",middleware.checkcommentownership,commentsController.commentsDelete);

module.exports = router;