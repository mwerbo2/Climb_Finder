const router = require('express').Router();
const routesData = require('../models/climbs');

// router.get('/find', function(req, res){
//   res.json(routesDataTwo)
// })


router.get('/', routesData.searchRoutes, function(req, res){
  console.log("got to the find route")
  res.json(res.filteredRoutes)
})

module.exports = router;
