'use strict'
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// SESSION MANAGEMENT
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

// //  Populate req.cookies
// app.use(cookieParser());
// //  Session setup
// app.use(session({
//   secret: 'wow very secret',
//   cookie: {
//     maxAge: 600000,
//     secure: true
//   },
//   saveUninitialized: false,
//   resave: false,
//   unset: 'destroy'
// }));

// app.use(cors({
//   origin: [
//     'http://localhost:8080',
//     'https://localhost:8080'
//   ],
//   credentials: true,
//   exposedHeaders: ['set-cookie']
// }));

// Set headers
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
require('./routes')(app);
app.get('/', function(req, res, next){
	res.send('Server is listening');
});

// listen on port 5000
app.listen(process.env.PORT || 5000, function () {
  console.log('Express app listening on: localhost:5000');
})