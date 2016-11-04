const MongoClient = require('mongodb').MongoClient;
// const dbConnection = ('mongodb://localhost:27017/climber')
 const dbConnection = process.env['MONGODB_URI'] ||'mongodb://localhost:27017/climber'



module.exports = {
  searchRoutes: function(req,res,next){
      const filterObj = {};
      // if('location' in req.query.location){
      //   filterObj['location'] = new RegExp('^' + req.query.location, 'i')
      // }
      if("climblocation" in req.query) {
        filterObj['climblocation'] = new RegExp('^' + req.query.climblocation, 'i')
        console.log(filterObj)
      }
      console.log("query", req.query)
      if('rating' in req.query) {
        filterObj['rating'] = new RegExp('^' + req.query.rating, 'i')
        console.log(filterObj)
      }
      if('type' in req.query) {
        filterObj['type'] = new RegExp('^' + req.query.type, 'i')
      }



    MongoClient.connect(dbConnection, function(err,db){
      if(err) throw err;
      db.collection('users')
      .find(filterObj)
      .toArray(function(err, results){
        if(err) throw err;
        res.filteredRoutes = results
        next();
      })
    })
  }
}
