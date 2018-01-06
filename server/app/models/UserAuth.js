//Including Mongoose model...
var mongoose = require('mongoose');
//creating object 
var Schema = mongoose.Schema;

//Schema for user
var userAuthSchema = new Schema({

	id               : {type: String },
    name             : {type: String, required: true }
})
    

//model for userschema
module.exports = mongoose.model('UserAuth' , userAuthSchema);
