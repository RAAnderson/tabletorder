
from datetime import datetime
start = datetime(2011, 1, 1)
end = datetime(2011, 12, 31)

// checks all orders that occured durring 2011, and grabs the employeeId off of each record, 
// then puts it into an array
// the query also groups employeeId records so there isn't any repeated in the array
var employeeIdList = db.orders.aggregate({ 
	$group : {
		employeeId : "$employeeId"
		date : { $gte: start, $lt: end }
	}
});

// Main query that checks the employees collection for any employeeId that exist from the array from above
// It then grabs the information for each employee, and returns the JSON objects 
db.employees.find( { _id: { $in: employeeIdList } } )
