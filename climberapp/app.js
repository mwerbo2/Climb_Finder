'use strict'
const express           = require('express');
const path              = require('path');
const logger            = require('morgan');
const bodyParser        = require('body-parser');
const session           = require('express-session');
const methodOverride    = require('method-override');
const app               = express();
const port              = process.env.PORT || 3000
// const routeData = require('routesData');
const homeRoute         = require('./routes/home');
const climbRoute        = require('./routes/climb');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(session({
  saveUnitialized:true,
  resave: true,
  secret: 'secrectsecret',
  cookie: {maxAge: 60000}
}));


app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
// app.use(bodyParser.json());


app.use('/', homeRoute)
// app.use('/signUp', signUpRoute)
app.use('/climbs', climbRoute)


app.listen(port, function(){
  console.log('Server running on port: ', port)
})
