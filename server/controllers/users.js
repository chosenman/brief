var mongoose = require('mongoose');
// var session = require('express-session');
// databases
  var User = mongoose.model('User');

// libraries
  var bcrypt = require('bcryptjs');

  // Google auth requirements
  var CLIENT_ID = "273487283165-bqorn91iag31tck4dejddojqhskllsvs.apps.googleusercontent.com"
  var GoogleAuth = require('google-auth-library');
  var auth = new GoogleAuth;
  var client = new auth.OAuth2(CLIENT_ID, '', '');



module.exports = {

  //********************************
  //***** front page with login
  //********************************
  front_page: function(req, res){
    // if user not logged in
  	var needUser = false;
    if(!req.session.userLoggedIn) {
      needUser = true;
    }
    res.render('index',{
      needUser: needUser,
      user: req.session.user
    });

  },

      //********* Google token validation
      token_signin: function(req, res){
        var token = req.body.idtoken;
        console.log(token);
        // sub: 40983980002302 - to store info
        client.verifyIdToken(
            token,
            CLIENT_ID,
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3],
            function(e, login) {
              var payload = login.getPayload();
              var userid = payload['sub'];
              console.log("user Id: " + userid);
              console.dir(payload);

              // checking if email is verified by Google
              if(payload['email_verified']){
                // saving in cookies that this user logged in
                req.session.userLoggedIn = true;
                req.session.user = {
                  name: payload['name'],
                  email: payload['email'],
                  picture: payload['picture'],
                  lang: payload['ru'],
                  given_name: payload['given_name']
                }
                // do store userId or sub(subject as userId) in database as Primary key
                console.log("user authorized");

                res.send('success');
                // res.redirect('/dashboard');

              // else go to login registration page
              } else {
                res.status(200).send('failed');
              }

            });
      },

  dashboard: function(req, res){

    var needUser = false;
    if(req.session.userLoggedIn && req.session.user) {
      needUser = true;
      res.render('dashboard', {
        needUser: needUser,
        user: req.session.user
      });
    } else {
      res.redirect('/');
    }

  },

  user_profile: function(req, res){
  },


  // logout controllers
  logout: function(req, res){
      req.session.userLoggedIn = false;
      req.session.user = "";
      res.redirect('/')
  }

}
