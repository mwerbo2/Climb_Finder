'use strict'
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000
// const routeData = require('routesData');

const homeRoute = require('./routes/routeRouter')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
// app.use(bodyParser.json());


app.use('/', homeRoute)
app.use('/all', homeRoute)
//signup route


app.get('/maps', function(req,res){
  res.render('maps')
})
app.listen(port, function(){
  console.log('Server running on port: ', port)
})
