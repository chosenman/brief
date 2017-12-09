var users = require('../controllers/users.js');


module.exports = function(app){

  app.get("/", function(req, res){
    users.front_page(req,res)
    // res.render('index')
  })

  // verifying token from googla on validity
  app.post('/tokensignin',function(req, res){
    users.token_signin(req,res)
  })

  // dashboard of general features of the app
  app.get("/dashboard", function(req, res){
    users.dashboard(req, res)
  })

  // user profile info
  app.get("/profile", function(req, res){
    users.user_profile(req, res)
  })

  // logout routes
  app.get("/logout", function(req, res){
    users.logout(req, res)
  })

}
