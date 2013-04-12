//Jules Bistro JSON ERD


var menu = {
	MenuCat :
	{
		Title : 		{ type: String, trim: true }
		, Description : { type: String }
		, Status : 		{ type: Boolean }
	}
	, FoodType : 	{ type: String, trim: true }
	, Title : 		{ type: String, trim: true }
	, Description : { type: String }
	, Price : 		{ type: Number }
	, MenuStatus : 	{ type: Number } 	// predefined codes that label status, ex: 1 = live, 4 = out of stock
	, MenuType : 	{ type: String, trim: true }  //breakfast lunch dinner specific items
	, CustomSeason :{ type: String }	//Used for spring only, summer only type items
	, Ingredients : { type: String } 	//long list of ingredients
}

///
var employee = {
	EmployeeId : 	{ type: Number }
	, JobTitle : 	{ type: String, trim: true }
	, FirstName : 	{ type: String, trim: true }
	, LastName : 	{ type: String, trim: true }
	, Address : 	{ type: String }
	, Zip : 		{ type: Number }
	, State : 		{ type: String, trim: true }
	, PhoneNumber : { type: Number, trim: true }
}

/// A table can have multiple Orders, and order represents groups of payment
var Order = {
	OrderId : 		{ type: Number }
	, Table : 		
	{
		Location : 		{ type: String }
		, TotalSeats : 	{ type: Number }
	}
	, EmployeeId : 	{ type: Number }
	, Cost : 		{ type: Number }
	, Payment : 	{ type: Number }
	, Tip : 		{ type: Number }
}

/// Represents every persons 
var Ticket = {
	TicketStatusId : 	{ type: Number }   //Used to show many status's 1-5...
	, OrderId : 		{ type: Number }
	, EmployeeId : 		{ type: Number }
	, MenuItemId : 		{ type: Number }
	, Customization : 	{ type: String }  //Used for typing in customizations to an order
}

//////////////////////////////////////////////////////////

/// Reference table, probably don't need to use it
var TableSchema = {
	Location : 		{ type: String }
	, TotalSeats : 	{ type: Number }
}

/// Reference table, probably not needed
var MenuCatSchema = new Schema({
		Title : 		{ type: String, trim: true }
		, Description : { type: String }
		, Status : 		{ type: Boolean }
})





