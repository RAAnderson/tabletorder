
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , employee = require('./routes/employee')
  , menuItem = require('./routes/menuItem')
  , order = require('./routes/order')
  , ticket = require('./routes/ticket')
  , table = require('./routes/table')
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
app.post('/table', table.tableHandler);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

