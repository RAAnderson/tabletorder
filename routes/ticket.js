///  Ticket routing

var Ticket = require('../models/tickets').Ticket;


exports.ticketHandler = function(req, res){

	var requestType = req.body.requestType;

	if (requestType == "list") {
		  Ticket.find({}, function(err, docs) {
		    if(!err) {
		      res.json(200, { tickets: docs });  
		    } else {
		      res.json(500, { message: err });
		    }
		  });

	} else if (requestType == "read") {

		var id = req.body._id; // The id of the Ticket the user wants to look up. 
		  
		  Ticket.findById(id, function(err, doc) {
		    if(!err && doc) {
		      res.json(200, { message: doc});
		    } else if(err) {
		      res.json(500, { message: "Error loading ticket." + err});
		    } else {
		      res.json(404, { message: "Ticket not found."});
		    }
		  });

	} 
	else if (requestType == "create") {

		  //var ticketId = req.body._id; // Name of Ticket. 

		  ///Ticket.findOne({ name: menuItemId }, function(err, doc) {  // This line is case sensitive.
		  //Ticket.findOne({ name: { $regex: new RegExp(Ticket_name, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
		  //  if(!err && !doc) {
		    if(!req.body._id) {
		      
		    var newTicket = new Ticket(); 

		    //newTicket.ticketId = req.body.ticketId;
			newTicket.orderId = req.body.orderId;
			newTicket.tableId = req.body.tableId;
			newTicket.ticketStatusId = req.body.ticketStatusId;
			newTicket.employeeId = req.body.employeeId;
			newTicket.menuItemId = req.body.menuItemId;
			newTicket.customization = req.body.customization;
		      
		      newTicket.save(function(err) {

		        if(!err) {
		          res.json(201, { object: newTicket});    
		        } else {
		          res.json(500, {message: "Could not create Ticket. Error: " + err});
		        }
		      });

		    } else if(req.body._id) {
		      // User is trying to create a Ticket with a menuItemId that already exists. 
		      res.json(403, {message: "cant create new ticket when submitting _id"}); 

		    } else {
		      res.json(500, { message: err});
		    } 
		  //});
	} 
	else if (requestType == "update") {

	  var id = req.body._id; 

	  Ticket.findById(id, function(err, doc) {
	      if(!err && doc) {

	        doc.orderId = req.body.orderId;
			doc.tableId = req.body.tableId;
			doc.ticketStatusId = req.body.ticketStatusId;
			doc.employeeId = req.body.employeeId;
			doc.menuItemId = req.body.menuItemId;
			doc.customization = req.body.customization;

	        doc.save(function(err) {
	          if(!err) {
	            res.json(200, {object: doc});    
	          } else {
	            res.json(500, {message: "Could not update ticket. " + err});
	          }  
	        });
	      } else if(!err) {
	        res.json(404, { message: "Could not find ticket."});
	      } else {
	        res.json(500, { message: "Could not update ticket." + err});
	      }
	    });

	} else if (requestType == "delete") {

		var id = req.body._id; 
		  	Ticket.findById(id, function(err, doc) {
		    if(!err && doc) {
		      doc.remove();
		      res.json(200, { message: "Ticket removed."});
		    } else if(!err) {
		      res.json(404, { message: "Could not find ticket."});
		    } else {
		      res.json(403, {message: "Could not delete ticket. " + err });
		    }
		});

	} else {
		//throw error
		res.json(405, {message: "complete failure!!!!  Ticket edition failure that is"});
	}

}





















