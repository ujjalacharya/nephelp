var express = require('express');
var router = express.Router();

router.get('/mental', function(req, res, next) {
    res.render('mental', { title: 'NepHelp' });
  });

  
module.exports = router;