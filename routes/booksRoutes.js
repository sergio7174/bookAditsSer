
const 
express=require("express"),
router=express.Router(),
campground=require("../models/campgrounds"),
middleware=require("../middleware"),
booksController = require("../controllers/booksController");


// rest of routes
router.get("/books", booksController.showBooks);
router.get("/add_books", middleware.isLoggedIn,(req,res)=>res.render("books/add_books"));
router.post('/add_books',middleware.isLoggedIn,booksController.add_books_post);
router.get("/books/:id",booksController.add_books_id);
router.get("/books/:id/edit", booksController.add_books_edit);
router.put("/books/:id", booksController.add_books_update);
 //destroy books route

 router.delete("/books/:id",middleware.checkcampgroundownership,booksController.add_books_delete); 

 module.exports = router;