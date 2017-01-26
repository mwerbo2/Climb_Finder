const MongoClient = require('mongodb').MongoClient;
// const dbConnection = ('mongodb://localhost:27017/climber')
const dbConnection = process.env['MONGODB_URI'] ||'mongodb://localhost:27017/climber'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config.js');
const salt = bcrypt.genSalt(10);


function showAll(req, res, next) {
  MongoClient.connect(dbConnection, function(err, db){
    db.collection('users').find({}).toArray(function(err, docs){
      res.climbers = docs;
      next();
    })
  })
};


function loginUser(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  MongoClient.connect(dbConnection, function(err, db) {
    db.collection('users').findOne({"email": email}, function(err, user) {
      if(err) throw err;
      if(user === null) {
        console.log("User does not exist");
      } else if(bcrypt.compareSync(password, user.passwordDigest)){
        // var token = jwt.sign(user, config.secret, {expiresIn: 1440});
        res.user = user;
        // res.user.token = token;
      };
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
function postClimb(req, res, next){
  // console.log('getting to model', req.body)
  console.log("email ", req.session.user.email)
  let email = req.session.user.email;
    MongoClient.connect(dbConnection, function(err, db){
      console.log('fired post')
      db.collection('users').findOne({"email": email}, function(err, user){
        if(err) throw err;
        if (user === null) {
          res.status(404)
        } else {
          db.collection('users').update(
            { "email": email},
            { $set: { climblocation: req.body.climblocation,
              climbdate: req.body.uniTimes,
              climbday: req.body.climbdate,
              climbtype: req.body.climbtype,
              climbrate: req.body.climbrate
            }}
          )
        }
        next();
      })

    })
}


function createUser(req, res, next) {
  createSecure( req.body.email, req.body.password, saveUser)
  console.log("creating user: ", req.body);
  function saveUser(email, hash) {
    MongoClient.connect(dbConnection, function(err, db) {
      let userInfo = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: email,
        passwordDigest: hash,
        level: req.body.level
      }
      db.collection('users').insertOne(userInfo, function(err, results) {
        console.log('saved user function')
        if(err) throw err;
        next();
      });
    });
  }
}

module.exports = { createUser, loginUser, showAll, postClimb }
