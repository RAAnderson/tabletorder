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
	, tickets : 	[ticketSchema]
});


/// Represents every food item orderd
var ticketSchema = new Schema({
	, ticketStatusId : 	{ type: Number }   //Used to show many status's 1-5...
	, employeeId : 		{ type: String }
	, customization : 	{ type: String }  //Used for typing in customizations to an order
	, date: 			{ type: Date, default: Date.now }
	, menuItem : {
		menuItemId : 	{ type: String }
		, menuCatId : 	{ type: Number }
		, foodType : 	{ type: String, trim: true }
		, title : 		{ type: String, trim: true }
		, description : { type: String }
		, price : 		{ type: Number }
		, menuStatus : 	{ type: Number } 	// predefined codes that label status, ex: 1 = live, 4 = out of stock
		, menuType : 	{ type: String, trim: true }  //breakfast lunch dinner specific items
		, customSeason :{ type: String }	//Used for spring only, summer only type items
		, ingredients : { type: String } 	//long list of ingredients
	}
});



var order = mongoose.model('order', orderSchema);

module.exports = {
  Order: order
};