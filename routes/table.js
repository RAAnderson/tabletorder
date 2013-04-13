///  Table routing

var Table = require('../models/tables').Table;


exports.tableHandler = function(req, res){

	var requestType = req.body.requestType;

	if (requestType == "list") {
		  Table.find({}, function(err, docs) {
		    if(!err) {
		      res.json(200, { tables: docs });  
		    } else {
		      res.json(500, { message: err });
		    }
		  });

	} else if (requestType == "read") {

		var newTableId = req.body.tableId; // The id of the Table the user wants to look up. 
		  
		  Table.findOne({ tableId: newTableId }, function(err, doc) {
		    if(!err && doc) {
		      res.json(200, { object: doc});
		    } else if(err) {
		      res.json(500, { message: "Error loading table." + err});
		    } else {
		      res.json(404, { message: "Table not found."});
		    }
		  });

	} 
	else if (requestType == "create") {

		var newTableId = req.body.tableId;

		    Table.findOne({ tableId: newTableId }, function(err, doc) {  // This line is case sensitive.
		  //Employee.findOne({ name: { $regex: new RegExp(Employee_name, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
		    if(!err && !doc) {
		      
		    var newTable = new Table(); 

			newTable.tableId = req.body.tableId;
			newTable.location = req.body.location;
			newTable.totalSeats = req.body.totalSeats;
		      
		      newTable.save(function(err) {

		        if(!err) {
		          res.json(201, { object :newTable});    
		        } else {
		          res.json(500, {object: "Could not create Table. Error: " + err});
		        }
		      });

		    } else if(!err) {
		      // User is trying to create a Table with a menuItemId that already exists. 
		      res.json(403, {message: "cant create new table when submitting _id"}); 

		    } else {
		      res.json(500, { message: "err"});
		    } 
		  });
	} 
	else if (requestType == "update") {

	  var newTableId = req.body.tableId; // The id of the Table the user wants to look up. 
		  
		  Table.findOne({ tableId: newTableId }, function(err, doc) {
	      if(!err && doc) {

	        doc.tableId = req.body.tableId;
			doc.location = req.body.location;
			doc.totalSeats = req.body.totalSeats;

	        doc.save(function(err) {
	          if(!err) {
	            res.json(200, {object:doc});    
	          } else {
	            res.json(500, {message: "Could not update table. " + err});
	          }  
	        });
	      } else if(!err) {
	        res.json(404, { message: "Could not find table."});
	      } else {
	        res.json(500, { message: "Could not update table." + err});
	      }
	    });

	} else if (requestType == "delete") {

		var newTableId = req.body.tableId; // The id of the Table the user wants to look up. 
		  
		  Table.findOne({ tableId: newTableId }, function(err, doc) {
		    if(!err && doc) {
		      doc.remove();
		      res.json(200, { message: "Table removed."});
		    } else if(!err) {
		      res.json(404, { message: "Could not find table."});
		    } else {
		      res.json(403, {message: "Could not delete table. " + err });
		    }
		});

	} else {
		//throw error
		res.json(405, {message: "complete failure!!!!  Table edition failure that is"});
	}

}





















