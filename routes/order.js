///  Order routing

var Order = require('../models/orders').Order;


exports.orderHandler = function(req, res){

	var requestType = req.body.requestType;

	if (requestType == "list") {
		  Order.find({}, function(err, docs) {
		    if(!err) {
		      res.json(200, { orders: docs });  
		    } else {
		      res.json(500, { message: err });
		    }
		  });

	} else if (requestType == "read") {

		var id = req.body._id; // The id of the Order the user wants to look up. 
		  
		  Order.findById(id, function(err, doc) {
		    if(!err && doc) {
		      res.json(200, doc);
		    } else if(err) {
		      res.json(500, { message: "Error loading order." + err});
		    } else {
		      res.json(404, { message: "Order not found."});
		    }
		  });

	} 
	else if (requestType == "create") {

		  //var orderId = req.body._id; // Name of Order. 

		  ///Order.findOne({ name: username }, function(err, doc) {  // This line is case sensitive.
		  //Order.findOne({ name: { $regex: new RegExp(Order_name, "i") } }, function(err, doc) {  // Using RegEx - search is case insensitive
		  //  if(!err && !doc) {
		    if(!req.body._id) {
		      
		    var newOrder = new Order(); 

		    //newOrder.orderId = req.body.orderId;
			newOrder.tableId = req.body.tableId;
			newOrder.employeeId = req.body.employeeId;
			newOrder.cost = req.body.cost;
			newOrder.payment = req.body.payment;
			newOrder.tip = req.body.tip;
			newOrder.status = req.body.status;
		      
		      newOrder.save(function(err) {
		        if(!err) {
		          res.json(201, {object: newOrder});    
		        } else {
		          res.json(500, {message: "Could not create Order. Error: " + err});
		        }
		      });

		    } else if(req.body._id) {
		      
		      // User is trying to create a Order with a username that already exists. 
		      res.json(403, {message: "Cant create new order with _id getting submitted to the API"}); 

		    } else {
		      res.json(500, { message: err});
		    } 
		  //});
	} 
	else if (requestType == "update") {

	  var id = req.body._id; 

	  Order.findById(id, function(err, doc) {
	      if(!err && doc) {

	        //doc.orderId = req.body._id;
			doc.tableId = req.body.tableId;
			doc.employeeId = req.body.employeeId;
			doc.cost = req.body.cost;
			doc.payment = req.body.payment;
			doc.tip = req.body.tip;
			doc.status = req.body.status;

	        doc.save(function(err) {
	          if(!err) {
	            res.json(200, {object: doc});    
	          } else {
	            res.json(500, {message: "Could not update order. " + err});
	          }  
	        });
	      } else if(!err) {
	        res.json(404, { message: "Could not find order."});
	      } else {
	        res.json(500, { message: "Could not update order." + err});
	      }
	    });

	} else if (requestType == "delete") {

		var id = req.body._id; 
		  	Order.findById(id, function(err, doc) {
		    if(!err && doc) {
		      doc.remove();
		      res.json(200, { message: "successfuly deleted"});
		    } else if(!err) {
		      res.json(404, { message: "Could not find order."});
		    } else {
		      res.json(403, {message: "Could not delete order. " + err });
		    }
		});

	} else {
		//throw error
		res.json(405, {message: "complete failure!!!!  Order edition failure that is"});
	}

}





















