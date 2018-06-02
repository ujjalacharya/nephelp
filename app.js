const express = require('express');
const app = express();
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser');
const expressValidator = require('express-validator')
const mongoose = require('mongoose');

const PORT = 8080;

const confident = require('./config/confident')

mongoose.connect(confident.dbConnstring, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log('Successfully connected to the database')
    }
})
global.User = require('./models/user')

app.use(express.static('public'))
// app.set('view engine', 'ejs');
// app.set('view engine', 'hbs');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.get('/', (req, res) => {
    res.render('index.html')
})

app.get('/chat', (req, res) => {
    res.render('chat.html')
})
app.get('/discussion', (req, res) => {
    res.render('dis.html')
})

app.get('/about', (req, res) => {
    res.render('about.html')
})

app.get('/contact', (req, res) => {
    res.render('contact.hbs')
})

app.get('/login', (req, res) => {
    res.render('login.hbs', { title: 'login' })
})

app.get('/register', (req, res) => {
    res.render('register.hbs', { title: 'Register' })
})
app.post('/register', (req, res) => {
    req.checkBody('name', 'Empty Name').notEmpty();
    req.checkBody('email', 'Invalid Email').isEmail();
    req.checkBody('email', 'Empty Email').notEmpty();
    let errors = req.validationErrors();
    if (errors) {
        res.render('register.ejs', {
            title: 'Register',
            name: req.body.name,
            email: req.body.email,
            errorMessages: errors
        })
    } else {
        res.render('thank.ejs')
    }

})

app.post('/contact/send', (req, res, next) => {
    var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: confident.username,
            pass: confident.pass
        }
    });
    var mailOptions = {
        from: "'Test Tester' <test@test.com>",
        to: "acharyaujjal1@gmail.com",
        subject: "Test subject",
        text: "You have a submission from Name: " + req.body.name + " Email: " + req.body.email + " Message: " + req.body.problem,
        html: "<p>You have a submission from...</p> <ul><li> Name: " + req.body.name +
            "</li><li> Email: " + req.body.email +
            "</li></li> Subject: " + req.body.subject +
            "<br /></li></li> Message: " + req.body.message + "</li>"

    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            return console.log(err);
        }
        console.log("Message has been sent...");
        res.redirect("/");

    });
});

app.listen(PORT, () => {
    console.log(`App started at port ${PORT}`)
})