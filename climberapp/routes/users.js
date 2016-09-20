const router = require('express').Router();
const { createUser, loginUser } = require('../models/users');

// router.get('/find', function(req, res){
//   res.json(routesDataTwo)
// })

router.get('/register', function(req, res){
  res.render('register', {user: req.session.user})
})

router.post('/register', createUser, function(req, res){
  res.redirect('/')
})


router.get('/login', function(req, res){
  res.render('login', {user: req.session.user})
})

router.post('/login', loginUser, function(req, res){
  req.session.user = res.user;

  req.session.save(function(err){
    if(err) throw err;
    res.redirect('/');
  });
});

router.delete('/logout', function(req, res){
  req.session.destroy(function(err){
    res.redirect('/')
  });
});


module.exports = router;
