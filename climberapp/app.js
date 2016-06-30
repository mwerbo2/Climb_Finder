'use strict'
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
// app.use(bodyParser.json());


app.get('/', function(req, res){
  res.render('home');
})

app.get('/maps', function(req,res){
  res.render('maps')
})
app.listen(port, function(){
  console.log('Server running on port: ', port)
})
