var express = require('express');
var burgers = require('../models/burger.js');

var router = express.Router();

router.get('/', function(req, res) {
  burgers.selectAll(function(result) {
    console.log(result);
    res.render('index', {burgers: result});
  });
});

router.post('/api/burgers', function(req, res) {
  burgers.create([
    'name', 'sleepy'
  ], [
    req.body.name, req.body.devoured
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put('/api/burgers/:id', function(req, res) {
  var condition = 'id = ' + req.params.id;
  burgers.updateOne(req.body, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});


module.exports = router;