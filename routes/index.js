"use strict";

const 
  // use the Router module in Express.js
  // This line creates a Router object that offers its own middleware
  // and routing alongside the Express.js app object.
  router = require("express").Router(),
  // use system routes
  usersRoutes = require("./usersRoutes"),
  homeRoutes = require("./homeRoutes"),
  bookRoutes = require("./booksRoutes"),
  commentsRoutes = require("./commentsRoutes");
 


  // // Adding routes for each page and request type
router.use("/", homeRoutes);
router.use("/users", usersRoutes);

router.use("/books", bookRoutes);
// implement a namespace for API endpoints that return JSON data or perform actions asynchronously
router.use("/comments", commentsRoutes);


module.exports = router;