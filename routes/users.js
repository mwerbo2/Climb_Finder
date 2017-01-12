const router = require('express').Router();
const { createUser, loginUser } = require('../models/users');

// router.get('/find', function(req, res){
//   res.json(routesDataTwo)
// })


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

router.post('/login', loginUser, function(req, res){
  // console.log("res.user", res.user);
  // console.log("save body ", req.body)
  req.session.user = res.user;

  req.session.save(function(err){
    if(err) throw err;
    res.redirect('/');
    console.log("req session:", req.session.user)
    console.log(res)
  });
});

router.delete('/logout', function(req, res){
  req.session.destroy(function(err){
    res.redirect('/')
  });
});


module.exports = router;
