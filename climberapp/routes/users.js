const router = require('express').Router();
const routesData = require('../models/climbs');

// router.get('/find', function(req, res){
//   res.json(routesDataTwo)
// })


router.get('/register', function(req, res){
  console.log("got to the registration route")
  res.render('register')
})


router.get('/login', function(req, res){
  console.log("got to the login route")
  res.render('login')
})


module.exports = router;
