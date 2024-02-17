
// and routing alongside the Express.js app object.
router = require("express").Router(),
homeController = require("../controllers/homeController");


// first system route
router.get("/", homeController.showHome);


module.exports = router;
