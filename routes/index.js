var express = require('express');
var router = express.Router();
const path = require('path')
var nodemailer = require('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NepHelp' });
});

router.get('/about', function(req, res, next) {
  res.render('about', { title: 'NepHelp'});
});

router.get('/explore', (req, res)=>{
  res.render('explore', {title: 'NeplHelp'})
})
router.get('/disc', (req, res)=>{
  res.render('disc', {title: 'NeplHelp'})
})
router.get('/gallery', (req, res)=>{
  res.render('gallery', {title: 'NeplHelp'})
})
router.get('/stat', (req, res)=>{
  res.render('stat', {title: 'NeplHelp'})
})
router.get("/faq", (req, res)=>{
  res.sendFile(path.join(__dirname, "/download/faq.pdf"));
});

router.route('/contact')
  .get(function(req, res, next) {
    res.render('contact', { title: 'NepHelp'});
  })
  .post(function(req, res, next) {
    req.checkBody('name', 'Empty name').notEmpty();
    req.checkBody('email', 'Invalid email').isEmail();
    req.checkBody('message', 'Empty message').notEmpty();
    var errors = req.validationErrors();

    if(errors) {
      res.render('contact', {
        title: 'NepHelp',
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        errorMessages: errors
      });
    } else {
      var mailOptions = {
        from: 'NepHelp <no-reply@nephelp.com>',
        to: 'acharyaujjal1@gmail.com',
        subject: 'You got a new message from user',
        html: 'From: '+req.body.name + '<br />'+'Email: '+ req.body.email+ '<br />'+ 'Message: ' +req.body.message
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }
        res.render('thank', { title: 'NepHelp'});
      });

    }
  });

module.exports = router;
