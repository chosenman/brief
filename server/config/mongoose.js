var mongoose = require('mongoose');
// require the fs module for loading model files
var fs = require('fs');

var path = require('path')
mongoose.connect('mongodb://localhost/thebrief');


var models_path = path.join(__dirname, './../models');

// read all of the files in the models_path and require (run) each of the javascript files
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') >= 0) {
    // require the file (this runs the model file which registers the schema)
    require(models_path + '/' + file);
  }
});
