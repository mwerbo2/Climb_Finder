const MongoClient = require('mongodb').MongoClient;
// const dbConnection = ('mongodb://localhost:27017/climber')
const dbConnection = process.env['MONGODB_URI'] ||'mongodb://localhost:27017/climber'
const bcrypt = require('bcrypt');
const salt = bcrypt.genSalt(10);

function loginUser(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;

  MongoClient.connect(dbConnection, function(err, db) {
    db.collection('users').findOne({"email": email}, function(err, user) {
      if(err) throw err;
      if(user === null) {
        console.log("User does not exist");
      } else if(bcrypt.compareSync(password, user.passwordDigest)){
        res.user = user;
      }
      next();
    })
  })
}

function createSecure(email, password, callback) {
  bcrypt.genSalt(function(err, salt){
    bcrypt.hash(password, salt, function(err, hash){
      callback(email,hash);
    })
  })
}

function createUser(req, res, next) {
  createSecure( req.body.email, req.body.password, saveUser)
  function saveUser(email, hash) {
    MongoClient.connect(dbConnection, function(err, db) {
      let userInfo = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: email,
        passwordDigest: hash,
        location: "The Cliffs",
        day: "Nov 23, 2016"
      }
      db.collection('users').insertOne(userInfo, function(err, results) {
        if(err) throw err;
        next();
      });
    });
  }
}




module.exports = { createUser, loginUser }
