const router = require('express').Router();
const session           = require('express-session');
const { createUser, loginUser, showAll } = require('../models/users');
const jwt = require('jsonwebtoken');
const config = require('../config.js');

// router.get('/find', function(req, res){
//   res.json(routesDataTwo)
// })

// router.use(function(req, res, next){
//   var token = req.body.token || req.query.token || req.headers['x-acces-token'];
//   // console.log()
// })
router.get('/poop', function(req, res, next){
  var sess = req.session;
  console.log("sess", sess.user);
  if (!sess.user) {
    res.send('Where you at?!');
  }else {
  res.send('Muahahahaha')
  }
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
  res.redirect('/')
})


router.get('/login', function(req, res){
  console.log("got to the login route")
  res.render('login', {user: req.session.user})
})

router.post('/loginuser', loginUser, function(req, res){
  // var token = jwt.sign(res.user, config.secret, {expiresIn: 1440});
  req.session.user = res.user;
console.log(res.user)
  req.session.save(function(err){
    if(err) throw err;
    res.redirect('/');
  });

});
router.get('/who', function(req,res){
  console.log('Who: ', req.session.user)
  res.send({user: req.session.user})
})

router.delete('/logout', function(req, res){
  req.session.destroy(function(err){
    res.redirect('/')
  });
});


module.exports = router;
