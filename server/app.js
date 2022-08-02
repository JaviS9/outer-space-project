'use strict'
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
// const { check, validationResult } = require('express-validator');

// //Controllers
var userController = require('./controllers/user');
var projectController = require('./controllers/project');

// //Models
var models = require('./models');

var app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  // Pass to next layer of middleware
  next();
});

//Para validar (authentication)
// express.Router().post('/register',
//   [
//     check('email', 'Email is not valid').isEmail(),
//     check('username', 'Username field is required').not().isEmpty(),
//     check('password', 'Password field is required').not().isEmpty()
//   ], 
//   function(req, res, next) {
//   // Check Errors
//   const errors = validationResult(req);
//   if (errors) {
//     console.log(errors);
//     res.render('register', { errors: errors.array() });
//   }
//   else {
//     console.log('No Errors');
//     res.render('dashboard', { message: 'Successful Registration.' });
//   }
// });

//--------------------------------------------------------------------------------------
// Catch 404 errors and forward to error handler.
// This is called if no match is found in the preceding route functions.
// error handler
// called as the last middleware. Expects an error object as the first argument,
// which we pass in manually as part of the next() function from within the other routes.
// This allows us to catch and handle errors in routes.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  var errorResponse = {};
  errorResponse.status = err.status;
  errorResponse.message = err.message;
  res.json(errorResponse);
});

//Import the Routes -> index.js
//var routes = require('./routes');
require('./routes')(app);
app.get('/', function(req, res, next){
	res.send('Home Route - nothing to see here yet');
});

// listen on port 5000
app.listen(process.env.PORT || 5000, function () {
  console.log('Express app listening on: localhost:5000');
})