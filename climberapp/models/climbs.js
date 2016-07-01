const MongoClient = require('mongodb').MongoClient;
const dbConnection = ('mongodb://localhost:27017/climber')



module.exports = {
  const filterObj = {};


  //filter function

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




