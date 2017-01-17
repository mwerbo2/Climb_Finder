const MongoClient = require('mongodb').MongoClient;
// const dbConnection = ('mongodb://localhost:27017/climber')
 const dbConnection = process.env['MONGODB_URI'] ||'mongodb://localhost:27017/climber'



module.exports = {
  searchRoutes: function(req,res,next){
      const filterObj = {};
      // if('location' in req.query.location){
      //   filterObj['location'] = new RegExp('^' + req.query.location, 'i')
      // }
      // console.log("req dat body ", req.query);
      var t = req.query;
      // console.log("req query", t)
      // var t2 = req.query.unixTime;
      // console.log(t, unixTime)
      // console.log("res")
      if("climblocation" in req.query) {
        filterObj['climblocation'] = new RegExp(req.query.climblocation)
      }
      if ("time" in req.query) {
        filterObj['climbdate'] = new RegExp(req.query.unixTime)
      }




    MongoClient.connect(dbConnection, function(err,db){
      if(err) throw err;
      db.collection('users')
      .find(filterObj)
      .toArray(function(err, results){
        if(err) throw err;
        res.filteredRoutes = results
        console.log(results);
        next();
      })
    })
  }
}
