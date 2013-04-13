var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var menuItemSchema = new Schema ({
	menuItemId : 	{ type: String }
	, menuCatId : 	{ type: Number }
	, status : 		{ type: Boolean }
	, foodType : 	{ type: String, trim: true }
	, title : 		{ type: String, trim: true }
	, description : { type: String }
	, price : 		{ type: Number }
	, menuStatus : 	{ type: Number } 	// predefined codes that label status, ex: 1 = live, 4 = out of stock
	, menuType : 	{ type: String, trim: true }  //breakfast lunch dinner specific items
	, customSeason :{ type: String }	//Used for spring only, summer only type items
	, ingredients : { type: String } 	//long list of ingredients
});

var menuItem = mongoose.model('menuItem', menuItemSchema);

module.exports = {
  MenuItem: menuItem
};