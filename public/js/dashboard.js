var dashboardContainer = $('#dashboardContainer');
var orderjson, otablejson, omenuitemsjson;
//user.username

function loadDashboard() {
    var data = { "requestType": "list" };
    resetAll();
    loadTablesForOrders();
    loadMenuItemsForOrders();
    displayAjaxLoader();
    dashboardContainer.html('<h1>Dashboard</h1>');
    dashboardContainer.append('<button onclick="createDash()" type="button" class="btn btnCreateDash">Add New Order</button>');
    dashHTML = '<ul id="dash">';
    $.post('./order', data).done(function (json) {
        orderjson = json;
        for (var i = 0; i < orderjson.orders.length; i++) {
            dashHTML += '<li>';
            dashHTML += '<div class="btn-group"><button onclick="updateDash(' + i + ')" type="button" class="btn updateDash">Update</button><button onclick="displayReceipt(\'' + orderjson.orders[i]._id + '\')" type="button" class="btn displayReceipte">Receipt</button><button onclick="deleteDash(' + i + ')" type="button" class="btn deleteDash">Done</button></div>';
            dashHTML += 'ID: <a onclick="displayOrderInfo(' + i + ')" href="#">' + orderjson.orders[i]._id + '</a>';
            dashHTML += '<br />Table: ' + orderjson.orders[i].tableId;
            dashHTML += '<br />Date: ' + convertDate(orderjson.orders[i].date)
            dashHTML += '<br />Employee: ' + orderjson.orders[i].employeeId
            dashHTML += '<ul id="tickets'+i+'">';
            dashHTML += '<li>';
            dashHTML += '<button onclick="createDashTicket()" type="button" class="btn btnCreateTicket">Add New Ticket</button>';
            dashHTML += '</li>';
            for (var t = 0; t < orderjson.orders[i].tickets.length; t++) {
                dashHTML += '<li>';
                dashHTML += '<div class="btn-group"><button onclick="updateEmployee(' + i + ')" type="button" class="btn updateEmployee">Update</button><button onclick="deleteEmployee(' + i + ')" type="button" class="btn deleteEmployee">Delete</button></div>';
                dashHTML += 'Menu Item: ' + orderjson.orders[t].tickets[t].menuItem.title;
                dashHTML += '<div>Notes: '+orderjson.orders[i].tickets[i].customization+' </div>';
                dashHTML += '</li>';
            }
            dashHTML += '</ul>';
            dashHTML += '</li>';
        }
        console.log(orderjson);
        dashHTML += '</ul>';
        dashboardContainer.append(dashHTML);
    }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
    resetAll();
    dashboardContainer.slideDown();
}

function createDash() {
    var formHTML = '';
    $('#formTitle').html('Add New Order');
    formHTML += '<table>';
    formHTML += '<tr><td>Select Table: </td><td><select id="selectTable">';
    for (var i = 0; i < otablejson.tables.length; i++) {
        formHTML += '<option value="' + otablejson.tables[i].tableId + '">' + otablejson.tables[i].tableId + '</option>';
    }
    formHTML += '</select></td></tr>';
    formHTML += '</table>';
    $('#formContent').html(formHTML);
    $('#formModel').modal('show');
    $('#saveForm').unbind('click');
    $('#saveForm').bind('click', function () {
        var orderCreate = {
            "requestType":"create"
            , "orderId" : "0"
            , "tableId" : $('#selectTable').val()
            , "employeeId" : user.username
            , "cost" : 0.00
            , "payment" : 0
            , "tip" : 0.00
            , "status" : 0
            , "date": new Date()  
            , tickets :  [ {
            }]};
        $.post('./order', orderCreate).done(function (json) {
            loadDashboard();
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#formModel').modal('hide');
    });
}

function deleteDash(node) {
    $('#confirmContent').html('Are you sure the order ' + orderjson.orders[node]._id + ' is done?');
    $('#confirmModal').modal('show');
    $('#confirmed').unbind('click');
    $('#confirmed').bind('click', function () {
        var order = {
            "requestType": "delete",
            "_id": orderjson.orders[node]._id
        }
        $.post('./order', order).done(function (json) {
            loadDashboard();
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#confirmModal').modal('hide');
    });
}

function updateDash(node) {
    var formHTML = '';
    $('#formTitle').html('Update Order');
    formHTML += '<table>';
    formHTML += '<tr><td>Select Table: </td><td><select id="selectTable">';
    for (var i = 0; i < otablejson.tables.length; i++) {
        formHTML += '<option value="' + otablejson.tables[i].tableId + '">' + otablejson.tables[i].tableId + '</option>';
    }
    formHTML += '</select></td></tr>';
    formHTML += '</table>';
    $('#formContent').html(formHTML);
    $('#formModel').modal('show');
    $('#saveForm').unbind('click');
    $('#saveForm').bind('click', function () {
        var orderUpdate = {
            "requestType": "update"
            , "_id":"51698e5d190769e627000001"
            , "orderId": orderjson.orders[node].orderId
            , "tableId" : $('#selectTable').val()
            , "employeeId": orderjson.orders[node].employeeId
            , "cost" : orderjson.orders[node].cost
            , "payment" : orderjson.orders[node].payment
            , "tip" : orderjson.orders[node].tip
            , "status" : orderjson.orders[node].status
            , tickets: orderjson.orders[node].tickets
        };
        $.post('./order', orderUpdate).done(function (json) {
            loadDashboard();
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#formModel').modal('hide');
    });
}   

function loadTablesForOrders() {
    var data = { "requestType": "list" };
    $.post('./table', data).done(function (json) {
        otablejson = json;
    }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
}

function loadMenuItemsForOrders() {
    var data = { "requestType": "list" };
    $.post('./menuItem', data).done(function (json) {
        omenuitemsjson = json;
    }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
}

function convertDate(date) {
    var orderDate = new Date(date);
    var simplyDate = orderDate.toUTCString();
    //var simplyDate = orderDate.getMonth() + '-' + orderDate.getDate() + '-' + orderDate.getFullYear() +'       '+ orderDate.getHours()+':'+orderDate.getMinutes()+':'+orderDate.getSeconds();
    return simplyDate;
}

function displayOrderInfo(node) {
    $("#tickets" + node).toggle();
    return false;
}
