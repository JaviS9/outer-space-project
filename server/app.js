'use strict'
const express = require('express');
const cors = require('cors')
// const router = require("./routes");
// const AppError = require("./utils/appError");
// const errorHandler = require("./utils/errorHandler");

const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
// const validator = require('express-validator');
// const { check, validationResult } = require('express-validator');

//Controllers
var userController = require('./controllers/user');
var projectController = require('./controllers/project');

var app = express();
app.use(bodyParser.json());
// app.use(validator);
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


//Import the Sequelize models -> index.js
var models = require('./models');

//Import the Routes -> index.js
//var routes = require('./routes');
require('./routes')(app);
app.get('/', function(req, res, next){
	res.send('Home Route - nothing to see here yet');
});

//--------------------------------------------------------------------------------------
// Catch 404 errors and forward to error handler.
// This is called if no match is found in the preceding route functions.
app.use(cors())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization','http://localhost:4200');
  if(req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
      return res.status(200).json({});
  }
  else {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  }
});

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

// listen on port 5000
app.listen(process.env.PORT || 5000, function () {
  console.log('Express app listening on: localhost:5000');
})