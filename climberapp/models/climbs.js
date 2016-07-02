const MongoClient = require('mongodb').MongoClient;
const dbConnection = ('mongodb://localhost:27017/climber')



module.exports = {
  searchRoutes: function(req,res,next){
    const filterObj = {};
    console.log(filterObj)
    // if('location' in req.query.location){
    //   filterObj['location'] = new RegExp('^' + req.query.location, 'i')
    // }
    if('rating' in req.query) {
      filterObj['rating'] = new RegExp('^' + req.query.rating, 'i')
      console.log(filterObj)
    }
    if('type' in req.query) {
      filterObj['type'] = new RegExp('^' + req.query.type, 'i')
    }


  //find array mdn function array.indexOf

  MongoClient.connect(dbConnection, function(err,db){
    if(err) throw err;
    db.collection('routes')
    .find(filterObj)
    .toArray(function(err, results){
      if(err) throw err;
      res.filteredRoutes = results
      next();
    })
  })
}
}
