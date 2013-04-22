var orderContainer = $('#orderContainer');

// function loadOrder() {
//     var orders;
     var data = {
        "requestType": "list",
    };
//     resetAll();
//     displayAjaxLoader();
//     //orderContainer.html('<h1>Orders</h1>');
//     //orderContainer.append('<button onclick="createOrder()" type="button" class="btn btnCreateOrder">Add New Order</button>');
//     //ajax
//     resetAll();
//     orderContainer.slideDown();
//     console.log('done');
// }
var ordersObject = "";
var currentOrder = "";

function loadOrder() {    
    $.post('http://localhost:5010/order', data).done(function (res) {
        displayOrders(res);
        ordersObject = res;
        console.log(ordersObject);
    }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
    resetAll();
    orderContainer.slideDown();
    console.log('done');
}

function displayOrders(data){
        var templater = $('#rick_orderTemplate').html();
        var htmler = Mustache.to_html(templater, data);
        $('#rick_orderList').html(htmler);
    };

function createTicket(){
console.log("start > createTicket");

}

function updateOrder(currentOrderId){
console.log("start > updateOrder");

for ( i=0; i < ordersObject.orders.length; i++){
    if(ordersObject.orders[i]._id  == currentOrderId) {
        currentOrder = ordersObject.orders[i];
    }
}

var formHTML = '';
    $('#formTitle').html('Update Order');
    formHTML += '<table>';
    formHTML += '<tr><td>Table Name: </td><td><input id="tableName" type="text" value="'+ currentOrder.tableId +'" /></td></tr>';
    formHTML += '<tr><td>status: </td><td><input id="status" type="text" value="'+ currentOrder.status +'" /></td></tr>';
    formHTML += '<tr><td>Total: </td><td><input id="cost" type="text" value="'+ currentOrder.cost +'" /></td></tr>';
    formHTML += '<tr><td>payment: </td><td><input id="payment" type="text" value="'+ currentOrder.payment +'" /></td></tr>';
    formHTML += '<tr><td>tip: </td><td><input id="tip" type="text" value="'+ currentOrder.tip +'"  /></td></tr>';
    formHTML += '<tr><td>employeeId: </td><td><input id="employeeId" type="text" value="'+ currentOrder.employeeId +'"  /></td></tr>'
    formHTML += '<tr><td>customization: </td><td><input id="customization" type="text" value="'+ currentOrder.customization +'" /></td></tr>';
    formHTML += '</table>';

    $('#formContent').html(formHTML);
    $('#formModel').modal('show');
    $('#saveForm').unbind('click');
    $('#saveForm').bind('click', function () {
        orderCreate = {
            "requestType": "create",
            "tableId": $('#tableName').val(),
            "status": $('#status').val(),
            "cost": $('#cost').val(),
            "payment": $('#payment').val(),
            "tip": $('#tip').val(),
            "employeeId": $('#employeeId').val(),
            "customization": $('#customization').val(),
            "tickets":""
        }
    
        $.post('./order', orderCreate).done(function (json) {
            loadOrder(json);
            console.log(json);
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#formModel').modal('hide');
    });

}

function deleteOrder(orderId){
    var orderDelete = {};
    orderDelete._id = orderId;
    orderDelete.requestType = "delete";
    $.post('./order', orderDelete).done(function (json) {
            console.log(json);
            loadOrder();
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        
}

function createOrder() {
    var formHTML = '';
    $('#formTitle').html('Add New order');
    formHTML += '<table>';
    formHTML += '<tr><td>Table Name: </td><td><input id="tableName" type="text" /></td></tr>';
    formHTML += '<tr><td>status: </td><td><input id="status" type="text" /></td></tr>';
    formHTML += '<tr><td>Total: </td><td><input id="cost" type="text" /></td></tr>';
    formHTML += '<tr><td>payment: </td><td><input id="payment" type="text" /></td></tr>';
    formHTML += '<tr><td>tip: </td><td><input id="tip" type="text" /></td></tr>';
    formHTML += '<tr><td>employeeId: </td><td><input id="employeeId" type="text" /></td></tr>'
    formHTML += '<tr><td>customization: </td><td><input id="customization" type="text" /></td></tr>';
    formHTML += '</table>';
    $('#formContent').html(formHTML);
    $('#formModel').modal('show');
    $('#saveForm').unbind('click');
    $('#saveForm').bind('click', function () {
        orderCreate = {
            "requestType": "create",
            "tableId": $('#tableName').val(),
            "status": $('#status').val(),
            "cost": $('#cost').val(),
            "payment": $('#payment').val(),
            "tip": $('#tip').val(),
            "employeeId": $('#employeeId').val(),
            "customization": $('#customization').val(),
            "tickets":""
        }
        
        $.post('./order', orderCreate).done(function (json) {
            loadOrder(json);
            console.log(json);
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#formModel').modal('hide');
    });
}