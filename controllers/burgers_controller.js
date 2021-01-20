var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");



// All routes set up 
router.get("/", function(req, res) {
    burger.all(function(data) {      
    res.render("index", {burgers: data});
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create(req.body.name, function(result) {
    res.json({id: result.insertID});
  });

  //   burger.create(["burger_name", "devoured"], [req.body.name, req.body.vegan  ], function(result) {
  //   // Send back the ID of the new quote
  //   res.json({ id: result.insertId });
  // });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update(1, req.params.id, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});



module.exports = router;