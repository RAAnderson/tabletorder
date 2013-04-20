var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/// A table can have multiple Orders, and order represents groups of payment
var orderSchema = new Schema({
	orderId : 		{ type: String }
	, tableId : 	{ type: Number }
	, employeeId : 	{ type: String }
	, cost : 		{ type: Number }
	, payment : 	{ type: Number }
	, tip : 		{ type: Number }
	, status : 		{ type: Number }
	, date: 		{ type: Date, default: Date.now }
	, ticket : 		[ticketSchema]
});


/// Represents every food item orderd
var ticketSchema = new Schema({
	tableId : 			{ type: Number }
	, ticketStatusId : 	{ type: Number }   //Used to show many status's 1-5...
	, employeeId : 		{ type: String }
	, menuItemId : 		{ type: String }
	, customization : 	{ type: String }  //Used for typing in customizations to an order
	, date: 			{ type: Date, default: Date.now }
});



var order = mongoose.model('order', orderSchema);

module.exports = {
  Order: order
};