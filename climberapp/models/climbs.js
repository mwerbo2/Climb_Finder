const MongoClient = require('mongodb').MongoClient;
const dbConnection = ('mongodb://localhost:27017/climber')



module.exports = {
  searchRoutes = function(req,res,next){
    const filterObj = {};
    if('location' in req.query){
      filterObj['location'] = new RegExp('^' + req.query.location, 'i')
    }
  }

  MongoClient.connect(dbConnection, function(err,db){
    if(err) throw err;
    db.collection('routes')
    .find(filterObj)
    .toArray(function(err, results){
      if(err) throw err;
      res.filteredRoutes = results
      next()
    })
  })
}




