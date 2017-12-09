var mongoose = require('mongoose');


// =============================================
var UserSchema = new mongoose.Schema({

// bio
 first_name: { type: String, required: true, minlength: 1},
 last_name: { type: String, required: true, minlength: 1},
 birthday: { type: Date, required: true},

// data
 picture: { type: String, required: true, minlength: 6},
 email: { type: String, required: true, minlength: 6 },

 locale: { type: String },

 // Only required field for user, it will never change
 userid_sub: { type: Number, required: true, minlength: 6,
   unique: [true, 'This userId is already registered!']
 }

})
mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'User'
 // We are retrieving this Schema from our Models, named 'User'
