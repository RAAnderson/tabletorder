
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , employee = require('./routes/employee')
  , menuItem = require('./routes/menuItem')
  , order = require('./routes/order')
  , ticket = require('./routes/ticket')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose');

var app = express();
//mongoose.connect('mongodb://54.243.210.81/potluckd');
mongoose.connect('mongodb://localhost/tabletorder');

// all environments
app.set('port', process.env.PORT || 5010);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/users', user.list);
app.post('/employee', employee.employeeHandler);
app.post('/menuItem', menuItem.menuItemHandler);
app.post('/order', order.orderHandler);
app.post('/ticket', ticket.ticketHandler);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});




/*
///   Test API Calls

http://localhost:5010/employee
{
"requestType":"list"
}

{
"requestType":"create",
"jobTitle":"Server",
"firstName":"John",
"lastName":"Doe",
"address":"1535 West Drive",
"zip":"55555",
"state":"MN",
"phoneNumber":"3205555555",
"username":"1",
"password":"1"
}

{
"requestType":"update",
"_id":"5169888a55d9d9fd21000001",
"jobTitle":"cook",
"firstName":"John",
"lastName":"Doe",
"address":"1535 West Drive",
"zip":"55555",
"state":"MN",
"phoneNumber":"3205555555",
"username":"1",
"password":"2"
}

{
"requestType":"delete",
"_id":"516988613b0cffc421000002"
}

//////////////////////////////////////////

http://localhost:5010/order

{
"requestType":"list"
}

{
"requestType":"read",
"_id":"51698e5d190769e627000001"
}

{
"requestType":"create",
"tableId":"1",
"employeeId":"516988613b0cffc421000002",
"cost":"10.50",
"payment":"31.00",
"tip":"17.00",
"status":"1"
}

{
"requestType":"update",
"_id":"51698e5d190769e627000001",
"tableId":"1",
"employeeId":"516988613b0cffc421000002",
"cost":"10.50",
"payment":"31.00",
"tip":"17.00",
"status":"0"
}







/////////////////////////////////////////
http://localhost:5010/ticket

{
"requestType":"list"
}

{
"requestType":"read",
"_id":"516984d22fe567231e000001"
}

{
"requestType":"create",
"orderId":"1111",
"tableId":"1",
"ticketStatusId":"1",
"employeeId":"123",
"menuItemId":"31",
"customization":"example customization right here!!!"
}

{
"requestType":"update",
"_id":"516984d22fe567231e000001",
"orderId":"2222",
"tableId":"1",
"ticketStatusId":"1",
"employeeId":"123",
"menuItemId":"31",
"customization":"I Just updated this record!!!"
}

////////////////////////////////////////////



*/
