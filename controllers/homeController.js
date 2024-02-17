"use strict";
const 
express=require("express"),
router=express.Router();

exports.showHome = (req, res) => {
  res.render("index", {
    
  });
};

