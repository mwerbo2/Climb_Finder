const MongoClient = require('mongodb').MongoClient;
// const dbConnection = ('mongodb://localhost:27017/climber')
 const dbConnection = process.env['MONGODB_URI'] ||'mongodb://localhost:27017/climber'



module.exports = {
  searchRoutes: function(req,res,next){
    console.log("reqqueryt", req.query)
    console.log("reqquery", req.query.time)
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
      console.log(`"${t.time}"`)
      if("climbLocation" in req.query) {
        filterObj["climblocation"] = new RegExp(req.query.climbLocation)
      }
      if ("time" in req.query) {
        filterObj["climbdate"] = t.time
      }
console.log("filt", filterObj)
    MongoClient.connect(dbConnection, function(err,db){
      if(err) throw err;
      db.collection('users')
      .find(filterObj)
      .toArray(function(err, results){
        if(err) throw err;
        res.filteredRoutes = results
        console.log("search results", results);
        next();
      })
    })
  }
}
