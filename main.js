"use strict";

const express = require("express"),
  app = express(),
  
  /*****require middleware  */
  middleware=require("./middleware"),
  
  /*****require models */
  
  User = require("./models/user.js"),
  campground = require("./models/campgrounds.js"),
  comment = require("./models/comment.js"),

  
  /* require controllers ****/
  homeController = require("./controllers/homeController"),
  booksController = require("./controllers/booksController"),
  errorController = require("./controllers/errorController"),
  usersController = require("./controllers/usersController"),
  commentsController = require ("./controllers/commentsController"),

  mongoose = require("mongoose"),
  passport = require("passport"),
  Localstrategy = require("passport-local"),
  flash = require("connect-flash"),

  // routes of the system 
  routerBooks = require("./routes/booksRoutes"),
  routerComments = require("./routes/commentsRoutes"),
  routerIndex = require("./routes/index"),
  routerHome = require("./routes/homeRoutes"),
  routerUsers = require("./routes/usersRoutes"),





  // method-override is middleware that interprets requests according to a specific query 
  // parameter and HTTP method. With the _method=PUT query parameter, you can interpret 
  // POST requests as PUT requests
  methodOverride = require("method-override");




  mongoose.connect(
    // Set up the connection to your database.  
      "mongodb://0.0.0.0:27017/mongo_db02",
      {// useNewUrlParser: true , // not longer neccesary
      // useFindAndModify: false } // not longer neccesary
      });
    //mongoose.set("useCreateIndex", true); // not longer neccesary
    // Assign the database to the db variable.
    const db = mongoose.connection;
    
    // Log a message when the application connects to the database.
    db.once("open", () => {
      console.log("Successfully connected to MongoDB using Mongoose!");
    });



  /* layouts = require("express-ejs-layouts");*/
// This line tells your Express.js application to set its view engine as ejs
app.set("view engine", "ejs");
// set up the aplication to listen on port 3000
app.set("port", process.env.PORT || 3000);
// Capturing posted data from the request body
// analyze incoming request bodies use of req.body
// To easily parse the body of a request, you need the help of the express.json and
// express.urlencoded middleware function. These modules act as middleware between 
// your request being received and processed fully with Express.js
app.use(express.urlencoded({extended: false}));
// analyze incoming request bodies use of req.body
// specify that you want to parse incoming requests that are URL-encoded 
// (usually, form post and utf-8 content) and in JSON format

app.use(express.json());
/*app.use(layouts);*/

// Tell the application to use methodOverride as middleware
// method-override is middleware that interprets requests according to a specific query
// parameter and HTTP method. With the _method=PUT query parameter, you can interpret
// POST requests as PUT requests

app.use(methodOverride("_method", { methods: ["POST", "GET"]}));


// enable the serving of static files include your assets and custom error pages, 
// such as 404.html and 500.html
// tells your application to use the corresponding public folder, at
// the same level in the project directory
app.use(express.static("public"));

app.use(
  require("express-session")({
    secret: "yeah huhhh",
    resave: false,
    saveUninitialized: false,
  })
);
// initialize the passport module and have your Express.js app use it
app.use(passport.initialize());
// Configure passport to use sessions in Express.js.
// passport.session tells passport to use whatever sessions you’ve already set up 
// with your application.
app.use(passport.session());

// set up your login strategy on the user model and tell passport to handle
// the hashing of user data in sessions for you
passport.use(new Localstrategy(User.authenticate()));
// Set up passport to serialize and deserialize your user data.
// These lines direct the process of encrypting and decrypting user data stored in sessions.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash()); // handle messages

// esta funcion define los datos que alimentan a las rutas de inicio del sistema
// debe estar colocada, arriba de las rutas del sistema, con la data req.user

app.use(function (req, res, next) {
 // variable local de la session res.locals.currentUser, 
 // req.user -property is set to the authenticated user 
 // req.user is create in nodejs passport session
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


// This code tells your Express.js application to use the router object as 
// a system for middleware and routing.
app.use(routerBooks);
app.use(routerComments);
app.use(routerIndex);
app.use(routerHome);
app.use(routerUsers);

// error routes
app.use(errorController.pageNotFoundError);
app.use(errorController.internalServerError);

// show the port the system is using
app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});
