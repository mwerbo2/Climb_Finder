const router = require('express').Router();
const routesData = require('../models/climbs');

// router.get('/find', function(req, res){
//   res.json(routesDataTwo)
// })


router.get('/', routesData.searchRoutes, function(req, res){
  console.log("got to the find route")
  res.json(res.filteredRoutes)
})


router.get('/favorites', function(req, res){
  console.log("got to the favorites route")
  res.render('favorites')
})

router.post('/favorites', function(req, res){
  console.log('this is my body' + req.body);
  res.redirect('/favorites')
})

module.exports = router;
