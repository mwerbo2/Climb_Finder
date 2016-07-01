const router = require('express').Router();
const routesData = require('../models/climbs')

router.get('/climbs', function(req, res){
  res.json(res.filteredRoutes)
})

module.exports = router;
