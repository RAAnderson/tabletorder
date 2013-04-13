
/*
 * GET users listing.
 */

// exports.list = function(req, res){
//   res.send("respond with a resource");
// };

var Employee = require('../models/employees').Employee;


exports.employeeHandler = function(req, res){

	var requestType = req.body.requestType;

	if (requestType === "list") {
		  Employee.find({}, function(err, docs) {
		    if(!err) {
		      res.json(200, { employees: docs });  
		    } else {
		      res.json(500, { message: err });
		    }
		  });

	} else if (requestType === "read") {

		var id = req.body._id; // The id of the Employee the user wants to look up. 
		  
		  Employee.findById(id, function(err, doc) {
		    if(!err && doc) {
		      res.json(200, doc);
		    } else if(err) {
		      res.json(500, { message: "Error loading employee." + err});
		    } else {
		      res.json(404, { message: "Employee not found."});
		    }
		  });

	} else if (requestType === "create") {

		  var userName = req.body.username; // Name of Employee. 

		  Employee.findOne({ name: username }, function(err, doc) {  // This line is case sensitive.
		  //Employee.findOne({ name: { $regex: new RegExp(Employee_name, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
		    if(!err && !doc) {
		      
		    var newEmployee = new Employee(); 

		    newEmployee.jobTitle = req.body.jobTitle;
			newEmployee.firstName = req.body.firstName;
			newEmployee.lastName = req.body.lastName;
			newEmployee.address = req.body.address;
			newEmployee.zip = req.body.zip;
			newEmployee.state = req.body.state;
			newEmployee.phoneNumber = req.body.phoneNumber;
			newEmployee.username = req.body.userName;
			newEmployee.password = req.body.password;
		      
		      newEmployee.save(function(err) {

		        if(!err) {
		          res.json(201, {message: "Employee created with username: " + newEmployee.username });    
		        } else {
		          res.json(500, {message: "Could not create Employee. Error: " + err});
		        }
		      });

		    } else if(!err) {
		      
		      // User is trying to create a Employee with a username that already exists. 
		      res.json(403, {message: "Employee with that username already exists, please update instead of create or create a new Employee with a different username."}); 

		    } else {
		      res.json(500, { message: err});
		    } 
		  });

	} else if (requestType === "update") {

	  var id = req.body._id; 

	  Employee.findById(id, function(err, doc) {
	      if(!err && doc) {

	        doc.jobTitle = req.body.jobTitle;
			doc.firstName = req.body.firstName;
			doc.lastName = req.body.lastName;
			doc.address = req.body.address;
			doc.zip = req.body.zip;
			doc.state = req.body.state;
			doc.phoneNumber = req.body.phoneNumber;
			doc.username = req.body.userName;
			doc.password = req.body.password;

	        doc.save(function(err) {
	          if(!err) {
	            res.json(200, {message: "Employee updated: " + doc.username});    
	          } else {
	            res.json(500, {message: "Could not update employee. " + err});
	          }  
	        });
	      } else if(!err) {
	        res.json(404, { message: "Could not find employee."});
	      } else {
	        res.json(500, { message: "Could not update employee." + err});
	      }
	    });

	} else if (requestType === "delete") {

		var id = req.body._id; 
		  	Employee.findById(id, function(err, doc) {
		    if(!err && doc) {
		      doc.remove();
		      res.json(200, { message: "Employee removed."});
		    } else if(!err) {
		      res.json(404, { message: "Could not find employee."});
		    } else {
		      res.json(403, {message: "Could not delete employee. " + err });
		    }
		});

	} else {
		//throw error
		res.json(405, {message: "complete failure!!!!  Employee edition failure that is"});
	}

}





















