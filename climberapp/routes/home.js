const express = require('express');
const router = express.Router();
const routesData = require('../routelist.json')


router.get('/', function(req, res){
  res.render('home')
})

router.get('/all', function(req, res){
  res.json(routesData)
})
// console.log(routesData)

module.exports = router;
