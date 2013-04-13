var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/// Represents every food item orderd
var ticketSchema = new Schema({
	orderId : 			{ type: String }
	, tableId : 		{ type: Number }
	, ticketStatusId : 	{ type: Number }   //Used to show many status's 1-5...
	, employeeId : 		{ type: String }
	, menuItemId : 		{ type: String }
	, customization : 	{ type: String }  //Used for typing in customizations to an order
	, date: 			{ type: Date, default: Date.now }
});

var ticket = mongoose.model('ticket', ticketSchema);

module.exports = {
  Ticket: ticket
};