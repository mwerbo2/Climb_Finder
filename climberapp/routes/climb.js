const router = require('express').Router();
const routesData = require('../models/climbs');

// router.get('/find', function(req, res){
//   res.json(routesDataTwo)
// })


router.get('/', routesData.searchRoutes, function(req, res){
  res.json(res.filteredRoutes)
})


router.get('/favorites', function(req, res){
  res.render('favorites')
})

router.post('/favorites', function(req, res){
  res.redirect('/favorites')
})

module.exports = router;
