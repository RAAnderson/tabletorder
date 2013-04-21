var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

/// A table can have multiple Orders, and order represents groups of payment
var orderSchema = new Schema({
	orderId : 		{ type: String }
	, tableId : 	{ type: String }
	, employeeId : 	{ type: String }
	, cost : 		{ type: String }
	, payment : 	{ type: String }
	, tip : 		{ type: String }
	, status : 		{ type: String }
	, date: 		{ type: Date, default: Date.now }
	, tickets : 	[ticketSchema]
});


/// Represents every food item orderd
var ticketSchema = new Schema({
	ticketStatusId : 	{ type: String }   //Used to show many status's 1-5...
	, employeeId : 		{ type: String }
	, customization : 	{ type: String }  //Used for typing in customizations to an order
	, date: 			{ type: Date, default: Date.now }
	, menuItem : {
		menuItemId : 	{ type: String }
		, menuCatId : 	{ type: String }
		, foodType : 	{ type: String, trim: true }
		, title : 		{ type: String, trim: true }
		, description : { type: String }
		, price : 		{ type: String }
		, menuStatus : 	{ type: String } 	// predefined codes that label status, ex: 1 = live, 4 = out of stock
		, menuType : 	{ type: String, trim: true }  //breakfast lunch dinner specific items
		, customSeason :{ type: String }	//Used for spring only, summer only type items
		, ingredients : { type: String } 	//long list of ingredients
	}
});



var order = mongoose.model('order', orderSchema);

module.exports = {
  Order: order
};