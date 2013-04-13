


var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/// Represents every food item orderd
var tableSchema = new Schema({
	tableId : 		{ type: Number }
	, location : 	{ type: String }
	, totalSeats : 	{ type: Number }
});

var table = mongoose.model('table', tableSchema);

module.exports = {
  Table: table
};
