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
            dashHTML += '<button onclick="createDashTicket('+i+')" type="button" class="btn btnCreateTicket">Add New Ticket</button>';
            dashHTML += '</li>';
            for (var t = 0; t < orderjson.orders[i].tickets.length; t++) {
                dashHTML += '<li id=o'+i+'t'+t+'>';
                dashHTML += '<div class="btn-group"><button onclick="updateDashTicket(' + i + ',' + t + ')" type="button" class="btn updateDashTicket">Update</button><button onclick="deleteDashTicket(' + i + ',' + t + ')" type="button" class="btn deleteDashTicket">Delete</button></div>';
                dashHTML += 'Menu Item: ' + orderjson.orders[i].tickets[t].menuItem.title;
                dashHTML += '<div>Notes: '+orderjson.orders[i].tickets[t].customization+' </div>';
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
            , "_id": orderjson.orders[node]._id
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

function createDashTicket(orderNode) {
    var formHTML = '';
    $('#formTitle').html('Add New Ticket');
    formHTML += '<table>';
    formHTML += '<tr><td>Select Menu Item: </td><td><select id="selectMenuItem">';
    for (var i = 0; i < omenuitemsjson.menuItems.length; i++) {
        formHTML += '<option id="selectMenuItem" value="' + i + '">' + omenuitemsjson.menuItems[i].title + '</option>';
    }
    formHTML += '</select></td></tr>';
    formHTML += '<tr><td>Notes: </td><td><textarea id="ticketCustom" rows="4" cols="30"></textarea></td></tr>';
    formHTML += '</table>';
    $('#formContent').html(formHTML);
    $('#formModel').modal('show');
    $('#saveForm').unbind('click');
    $('#saveForm').bind('click', function () {
        orderjson.orders[orderNode].tickets.push({
            "ticketStatusId": 1
            , "employeeId": user.username
            , "customization": $('#ticketCustom').val()
            , "date": new Date()
            , "menuItem": omenuitemsjson.menuItems[$('#selectMenuItem').val()]
        });

        var orderUpdate = {
            "requestType": "update"
            , "_id": orderjson.orders[orderNode]._id
            , "orderId": orderjson.orders[orderNode].orderId
            , "tableId": orderjson.orders[orderNode].tableId
            , "employeeId": orderjson.orders[orderNode].employeeId
            , "cost": orderjson.orders[orderNode].cost
            , "payment": orderjson.orders[orderNode].payment
            , "tip": orderjson.orders[orderNode].tip
            , "status": orderjson.orders[orderNode].status
            , tickets: orderjson.orders[orderNode].tickets

        }
        $.post('./order', orderUpdate).done(function (json) {
            //loadDashboard();
            newestTicket = orderjson.orders[orderNode].tickets.length - 1;
            dashHTML = '<li>';
            dashHTML += '<div class="btn-group"><button onclick="updateDashTicket(' + orderNode + ',' + newestTicket + ')" type="button" class="btn updateDashTicket">Update</button><button onclick="deleteDashTicket(' + orderNode + ',' + newestTicket + ')" type="button" class="btn deleteDashTicket">Delete</button></div>';
            dashHTML += 'Menu Item: ' + orderjson.orders[orderNode].tickets[newestTicket].menuItem.title;
            dashHTML += '<div>Notes: ' + orderjson.orders[orderNode].tickets[newestTicket].customization + ' </div>';
            dashHTML += '</li>';
            $('#tickets'+orderNode).append(dashHTML);
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#formModel').modal('hide');
    });
}

function updateDashTicket(orderNode, node) {
    console.log('update');
}

function deleteDashTicket(orderNode, node) {
    $('#confirmContent').html('Are you sure you want to delete ticket for ' + orderjson.orders[orderNode].tickets[node].menuItem.title + '?');
    $('#confirmModal').modal('show');
    $('#confirmed').unbind('click');
    $('#confirmed').bind('click', function () {
        orderjson.orders[orderNode].tickets.remove(node, node);

        var orderUpdate = {
            "requestType": "update"
            , "_id": orderjson.orders[orderNode]._id
            , "orderId": orderjson.orders[orderNode].orderId
            , "tableId": orderjson.orders[orderNode].tableId
            , "employeeId": orderjson.orders[orderNode].employeeId
            , "cost": orderjson.orders[orderNode].cost
            , "payment": orderjson.orders[orderNode].payment
            , "tip": orderjson.orders[orderNode].tip
            , "status": orderjson.orders[orderNode].status
            , tickets: orderjson.orders[orderNode].tickets
        };
        $.post('./order', orderUpdate).done(function (json) {
            $('#o' + orderNode + 't' + node).slideUp();
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#confirmModal').modal('hide');
    });
}

Array.prototype.remove = function (from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};