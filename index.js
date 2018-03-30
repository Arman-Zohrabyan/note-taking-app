const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const config = require('./config');


// connect to the database and load models
require('./server/models').connect(config.dbUri);

const app = express();

// tell the app to parse HTTP body messages
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

// pass the passport middleware
app.use(passport.initialize());

// enabled All CORS Requests
app.use(cors());


// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authorization checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);


// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);


// start the server
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001 or http://127.0.0.1:3001');
});
