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
	, date: 		{ type: Date, default: Date.now }
});

var order = mongoose.model('order', orderSchema);

module.exports = {
  Order: order
};