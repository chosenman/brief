var express = require('express')
var path = require('path')
var bodyParser = require('body-parser');
var session = require('express-session');
var port = 8020;


var app = express();

app.use(express.static(path.join(__dirname + "/client/static")));
app.set('views', path.join(__dirname, './client/views'));
app.use(session({secret: 'S5oD42iH_ng-d3j!or2JO9cK8s'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.disable('view cache');

require('./server/config/mongoose.js');

  // store the function in a variable
  var routes_setter = require('./server/config/routes.js');
  // invoke the function stored in routes_setter and pass it the "app" variable
  routes_setter(app);


var server = app.listen(port, function(){
  console.log("listening on port " + port);
})
