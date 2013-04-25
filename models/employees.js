var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

///
var employeeSchema = new Schema({
//	employeeId : 	{ type: String }
	jobTitle : 	{ type: String, trim: true }
	, firstName : 	{ type: String, trim: true }
	, lastName : 	{ type: String, trim: true }
	, address : 	{ type: String }
	, zip : 		{ type: String }
	, state : 		{ type: String, trim: true }
	, phoneNumber : { type: String, trim: true }
	, username : 	{ type: String, trim: true }
	, password : 	{ type: String, trim: true }
});

var employee = mongoose.model('employee', employeeSchema);

module.exports = {
  Employee: employee
};