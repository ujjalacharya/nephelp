var express = require('express');
var router = express.Router();

router.get('/sexual', function(req, res, next) {
    res.render('sexual', { title: 'NepHelp' });
  });

  
module.exports = router;