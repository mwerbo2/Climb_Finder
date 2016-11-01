const express = require('express');
const router = express.Router();
const routesData = require('../routelist.json')


router.get('/', function(req, res){
  res.render('home', {user: req.session.user});
})

router.get('/all', function(req, res){
  res.json(routesData)
})


module.exports = router;
