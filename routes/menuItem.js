
/* 
 * GET users listing.
 */

var MenuItem = require('../models/menuItems').MenuItem;

exports.menuItemHandler = function(req, res){

	var requestType = req.body.requestType;

	if (requestType === "list") {
		  MenuItem.find({}, function(err, docs) {
		    if(!err) {
		      res.json(200, { menuItems: docs });  
		    } else {
		      res.json(500, { message: err });
		    }
		  });

	} else if (requestType == "read") {

		var id = req.body._id; // The id of the MenuItem the user wants to look up. 
		  
		  MenuItem.findById(id, function(err, doc) {
		    if(!err && doc) {
		      res.json(200, doc);
		    } else if(err) {
		      res.json(500, { message: "Error loading menuItem." + err});
		    } else {
		      res.json(404, { message: "MenuItem not found."});
		    }
		  });

	} else if (requestType == "create") {

		  var title = req.body.title; // Name of MenuItem. 

		  MenuItem.findOne({ name: title }, function(err, doc) {  // This line is case sensitive.
		  //MenuItem.findOne({ name: { $regex: new RegExp(MenuItem_name, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
		    if(!err && !doc) {
		      
		    var newMenuItem = new MenuItem(); 

		    newMenuItem.menuCatId = req.body.jobTitle;
			newMenuItem.status = req.body.firstName;
			newMenuItem.foodType = req.body.lastName;
			newMenuItem.title = req.body.title;
			newMenuItem.description = req.body.description;
			newMenuItem.price = req.body.price;
			newMenuItem.menuStatus = req.body.menuStatus;
			newMenuItem.menuType = req.body.menuType;
			newMenuItem.customSeason = req.body.customSeason;
			newMenuItem.ingredients = req.body.ingredients;
		      
		      newMenuItem.save(function(err) {

		        if(!err) {
		          res.json(201, {message: "MenuItem created with title: " + newMenuItem.title });    
		        } else {
		          res.json(500, {message: "Could not create MenuItem. Error: " + err});
		        }
		      });

		    } else if(!err) {
		      
		      // User is trying to create a MenuItem with a title that already exists. 
		      res.json(403, {message: "MenuItem with that title already exists, please update instead of create or create a new MenuItem with a different title."}); 

		    } else {
		      res.json(500, { message: err});
		    } 
		  });

	} else if (requestType == "update") {

	  var id = req.body._id; 

	  MenuItem.findById(id, function(err, doc) {
	      if(!err && doc) {

	        doc.menuCatId = req.body.jobTitle;
			doc.status = req.body.firstName;
			doc.foodType = req.body.lastName;
			doc.title = req.body.title;
			doc.description = req.body.description;
			doc.price = req.body.price;
			doc.menuStatus = req.body.menuStatus;
			doc.menuType = req.body.menuType;
			doc.customSeason = req.body.customSeason;
			doc.ingredients = req.body.ingredients;

	        doc.save(function(err) {
	          if(!err) {
	            res.json(200, {message: "MenuItem updated: " + doc.title});    
	          } else {
	            res.json(500, {message: "Could not update menuItem. " + err});
	          }  
	        });
	      } else if(!err) {
	        res.json(404, { message: "Could not find menuItem."});
	      } else {
	        res.json(500, { message: "Could not update menuItem." + err});
	      }
	    });

	} else if (requestType == "delete") {

		var id = req.body._id; 
		  	MenuItem.findById(id, function(err, doc) {
		    if(!err && doc) {
		      doc.remove();
		      res.json(200, { message: "MenuItem removed."});
		    } else if(!err) {
		      res.json(404, { message: "Could not find menuItem."});
		    } else {
		      res.json(403, {message: "Could not delete menuItem. " + err });
		    }
		});

	} else {
		//throw error
		res.json(405, {message: "complete failure!!!!  MenuItem edition failure that is"});
	}

}





















