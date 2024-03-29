﻿var tableContainer = $('#tablesContainer');
var tablesjson;

function loadTables() {
    var table;
    var data = {"requestType":"list"};
    resetAll();
    displayAjaxLoader();
    tableContainer.html('<h1>Tables</h1>');
    tableContainer.append('<button onclick="createTable()" type="button" class="btn btnCreateTable">Add New Table</button>');

    $.post('./table', data).done(function (json) {
        tablesjson = json;
        tablesHTML = '<ul id="tables">';
        for (var i = 0; i < tablesjson.tables.length; i++) {
            tablesHTML += '<li>';
            tablesHTML += '<a onclick="displayTableInfo(' + i + ')" href="#">' + tablesjson.tables[i].tableId + '</a>';
            tablesHTML += '<button onclick="deleteTable('+i+')" type="button" class="btn deleteTable">Delete</button>';
            tablesHTML += '<div id="tableInfo'+i+'" class="tableInfo">';
            tablesHTML += '<table>';
            tablesHTML += '<tr><td>Table: </td><td>' + tablesjson.tables[i].tableId + '</td></tr>';
            tablesHTML += '<tr><td>Location: </td><td>' + tablesjson.tables[i].location + '</td></tr>';
            tablesHTML += '<tr><td>Number of seats: </td><td>' + tablesjson.tables[i].totalSeats + '</td></tr>';
            tablesHTML += '</table>';
            tablesHTML += '<button onclick="updateTable(' + i + ')" type="button" class="btn updateTable">Update</button>';
            tablesHTML += '</div>';
            tablesHTML += '</li>';
        }
        tablesHTML += '</ul>';
        tableContainer.append(tablesHTML);
    }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
    resetAll();
    tableContainer.slideDown();
}

function createTable() {
    var formHTML = '';
    $('#formTitle').html('Add New Table');
    formHTML += '<table>';
    formHTML += '<tr><td>Table Name: </td><td><input id="tableName" type="text" /></td></tr>';
    formHTML += '<tr><td>Location: </td><td><input id="tableLocation" type="text" /></td></tr>'
    formHTML += '<tr><td>Number of seats: </td><td><input id="numOfSeats" type="text" /></td></tr>';
    formHTML += '</table>';
    $('#formContent').html(formHTML);
    $('#formModel').modal('show');
    $('#saveForm').unbind('click');
    $('#saveForm').bind('click', function () {
        tableCreate = {
            "requestType": "create",
            "tableId": $('#tableName').val(),
            "location": $('#tableLocation').val(),
            "totalSeats": $('#numOfSeats').val()
        }
        $.post('./table', tableCreate).done(function (json) {
            loadTables();
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#formModel').modal('hide');
    });
}

function updateTable(node) {
    var formHTML = '';
    var tableHTML = '';
    $('#formTitle').html('Update Table');
    formHTML += '<table>';
    formHTML += '<tr><td>Table Name: </td><td>' + tablesjson.tables[node].tableId + '</td></tr>';
    formHTML += '<tr><td>Location: </td><td><input id="tableLocation" type="text" value="' + tablesjson.tables[node].location + '"/></td></tr>'
    formHTML += '<tr><td>Number of seats: </td><td><input id="numOfSeats" type="text" value="' + tablesjson.tables[node].totalSeats + '"/></td></tr>';
    formHTML += '</table>';
    $('#formContent').html(formHTML);
    $('#formModel').modal('show');
    $('#saveForm').unbind('click');
    $('#saveForm').bind('click', function () {
        tableUpdate = {
            "requestType": "update",
            "tableId": tablesjson.tables[node].tableId,
            "location": $('#tableLocation').val(),
            "totalSeats": $('#numOfSeats').val()
        }
        $.post('./table', tableUpdate).done(function (json) {
            loadTables();
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#formModel').modal('hide');
    });
}

function deleteTable(node) {
    $('#confirmContent').html('Are you sure you want to delete table: ' + tablesjson.tables[node].tableId + '?');
    $('#confirmModal').modal('show');
    $('#confirmed').unbind('click');
    $('#confirmed').bind('click', function () {
        var table = {
            "requestType": "delete",
            "tableId": tablesjson.tables[node].tableId
        }
        $.post('./table', table).done(function (json) {
            loadTables();
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#confirmModal').modal('hide');
    });
}

function displayTableInfo(node) {
    $("#tableInfo" + node).toggle();
    return false;
}
