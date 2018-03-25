const router = require('express').Router();
const session           = require('express-session');
const { createUser, loginUser, showAll, postClimb } = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config.js');

// router.get('/find', function(req, res){
//   res.json(routesDataTwo)
// })

// router.use(function(req, res, next){
//   var token = req.body.token || req.query.token || req.headers['x-acces-token'];
//   // console.log()
// })
router.get('/profile', function(req, res, next){
  var sess = req.session;
  if (!sess.user) {
    res.redirect('/user/register')
  } else {
  res.render('profile');
  };
})


router.get('/all', showAll, (req,res)=>{
  console.log('Show all users ');
  res.json(res.climbers)
})

router.get('/register', function(req, res){
  console.log("got to the registration route")
  res.render('register', {user: req.session.user})
})

router.post('/register', createUser, function(req, res){
  console.log("req.body", req.body);
  res.redirect('/user/profile')
})


router.get('/login', function(req, res){
  console.log("got to the login route")
  res.render('login', {user: req.session.user})
})

router.post('/loginuser', loginUser, function(req, res){
  // var token = jwt.sign(res.user, config.secret, {expiresIn: 1440});
  console.log(res.statusCode)
  if (res.statusCode === 401) {
    res.json({loginSuccess: false})
    // .redirect('/user/profile')
  } else {
    res.status(200);
    res.redirect('/user/profile')
    req.session.user = res.user;
  }
  req.session.save(function(err){
    if(err) throw err;
    // res.redirect('/user/profile');
  });

});
router.get('/who', function(req,res){
  console.log('Who: ', req.session.user)
  res.send({user: req.session.user})
})

router.post('/postClimb', postClimb, function(req, res, next){
  // console.log(res.statusCode)
  console.log("made it to next post climb")
  res.status(200).redirect('/')
})

router.post('/belay', function(req, res, next){
  console.log('hi')
})

router.delete('/logout', function(req, res){
  req.session.destroy(function(err){
  res.redirect('/')
  });
});


module.exports = router;
