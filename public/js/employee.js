var employeeContainer = $('#employeeContainer');
var empjson;

function loadEmployee() {
    var employee;
    var data = {"requestType":"list"}
    resetAll();
    displayAjaxLoader();
    employeeContainer.html('<h1>Employees</h1>');
    employeeContainer.append('<button onclick="createEmployees()" type="button" class="btn btnCreateEmployee">Add New Employee</button>');

    $.post('./employee', data).done(function (json) {
        var employeeHTML='';
        empjson = json;
        employeeHTML += '<ul id="employee">';
        for (var i = 0; i < empjson.employees.length; i++) {
            employeeHTML += '<li>';
            employeeHTML += '<a onclick="displayEmpInfo(' + i + ')" href="#"><span class="employeeName">' + empjson.employees[i].firstName + ' ' + empjson.employees[i].lastName + '</span></a>';
            employeeHTML += '<div class="btn-group"><button onclick="updateEmployee(' + i + ')" type="button" class="btn updateEmployee">Update</button><button onclick="deleteEmployee(' + i + ')" type="button" class="btn deleteEmployee">Delete</button></div>';
            employeeHTML += '<form id="employeeInfo'+i+'" class="employeeForm">';
            employeeHTML += '<div class="leftCol">';
            employeeHTML += '<div>Username: ' + empjson.employees[i].username + '</div>';
            employeeHTML += '<button type="button" onclick="changePassword('+i+')" class="btn btnPassword">Change Password</button>';
            employeeHTML += '</div>';
            employeeHTML += '<fieldset class="empInfo"><legend>Employee Info</legend>';
            employeeHTML += '<table>';
            employeeHTML += '<tr><td><label for="jobTitle">Job Title:</label></td><td>' + empjson.employees[i].jobTitle+ '</td></tr>';
            employeeHTML += '<tr><td><label for="lastName">First Name:</label></td><td>' + empjson.employees[i].firstName + '</tr>';
            employeeHTML += '<tr><td><label for="lastName">Last Name:</label></td><td>' + empjson.employees[i].lastName + '</td></tr>';
            employeeHTML += '<tr><td><label for="address">Address:</label></td><td>' + empjson.employees[i].address + '</td></tr>';
            employeeHTML += '<tr><td><label for="state">State:</label></td><td>' + empjson.employees[i].state + '</td></tr>';
            employeeHTML += '<tr><td><label for="zip">Zip:</label></td><td>' + empjson.employees[i].zip + '</td></tr>';
            employeeHTML += '<tr><td><label for="phonenumber">Phone Number:</label></td><td>' + empjson.employees[i].phoneNumber+ '</td></tr>';
            employeeHTML += '</table>';
            employeeHTML += '</fieldset>';
            employeeHTML += '</form>';
            employeeHTML += '<div class="clear"></div>';
            employeeHTML += '</li>';
        }
        employeeHTML += '</ul>';
        employeeContainer.append(employeeHTML);
    }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
    resetAll();
    employeeContainer.slideDown();
    console.log('done');
}

function updateEmployee(node) {
    var formHTML = '';
    $('#formTitle').html('Update Employee');
    formHTML += '<div style="width:500px">';
    formHTML += '<form class="employeeCForm">';
    formHTML += '<fieldset class="empInfo"><legend>Employee Info</legend>';
    formHTML += '<table>';
    formHTML += '<tr><td><label for="jobTitle">Job Title:</label></td><td><input id="jobTitle" type="text" value="' + empjson.employees[node].jobTitle + '" /></td></tr>';
    formHTML += '<tr><td><label for="lastName">First Name:</label></td><td><input id="fname" type="text" value="' + empjson.employees[node].firstName + '" /></td></tr>';
    formHTML += '<tr><td><label for="lastName">Last Name:</label></td><td><input id="lname" type="text" value="' + empjson.employees[node].lastName + '" /></td></tr>';
    formHTML += '<tr><td><label for="address">Address:</label></td><td><input id="address" type="text" value="' + empjson.employees[node].address + '" /></td></tr>';
    formHTML += '<tr><td><label for="state">State:</label></td><td><input style="width:20px;" id="state" type="text" value="' + empjson.employees[node].state + '" /></td></tr>';
    formHTML += '<tr><td><label for="zip">Zip:</label></td><td><input style="width:50px;" id="zip" type="text" value="' + empjson.employees[node].zip + '" /></td></tr>';
    formHTML += '<tr><td><label for="phonenumber">PhoneNumber:</label></td><td><input id="phonenumber" type="text" value="' + empjson.employees[node].phoneNumber + '" /></td></tr>';
    formHTML += '</table>';
    formHTML += '</fieldset>';
    formHTML += '<fieldset class="userCInfo" ><legend>User Info</legend>';
    formHTML += '<table>';
    formHTML += '<tr><td><label>Username:</label></td><td><input id="username" type="text" value="' + empjson.employees[node].username + '" />';
    formHTML += '</table>';
    formHTML += '</fieldset>';
    formHTML += '</form>';
    formHTML += '</div>';
    $('#formContent').html(formHTML);
    $('#formModel').modal('show');
    $('#saveForm').unbind('click');
    $('#saveForm').bind('click', function () {
        var employeeUpdate = {
            "requestType": "update",
            "_id": empjson.employees[node]._id,
            "jobTitle": $('#jobTitle').val(),
            "firstName": $('#fname').val(),
            "lastName": $('#lname').val(),
            "address": $('#address').val(),
            "zip": $('#zip').val(),
            "state": $('#state').val(),
            "phoneNumber": $('#phonenumber').val(),
            "username": $('#username').val(),
            "password": empjson.employees[node].password
        }
        $.post('./employee', employeeUpdate).done(function (json) {
            loadEmployee();
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#formModel').modal('hide');
    });
}

function createEmployees() {
    var formHTML = '';
    $('#formTitle').html('Add New Employee');
    formHTML += '<div style="width:500px">';
    formHTML += '<form class="employeeCForm">';
    formHTML += '<fieldset class="empInfo"><legend>Employee Info</legend>';
    formHTML += '<table>';
    formHTML += '<tr><td><label for="jobTitle">Job Title:</label></td><td><input id="jobTitle" type="text" /></td></tr>';
    formHTML += '<tr><td><label for="lastName">First Name:</label></td><td><input id="fname" type="text" /></td></tr>';
    formHTML += '<tr><td><label for="lastName">Last Name:</label></td><td><input id="lname" type="text" /></td></tr>';
    formHTML += '<tr><td><label for="address">Address:</label></td><td><input id="address" type="text" /></td></tr>';
    formHTML += '<tr><td><label for="state">State:</label></td><td><input style="width:20px;" id="state" type="text" /></td></tr>';
    formHTML += '<tr><td><label for="zip">Zip:</label></td><td><input style="width:50px;" id="zip" type="text" /></td></tr>';
    formHTML += '<tr><td><label for="phonenumber">PhoneNumber:</label></td><td><input id="phonenumber" type="text" /></td></tr>';
    formHTML += '</table>';
    formHTML += '</fieldset>';
    formHTML += '<fieldset class="userCInfo" ><legend>User Info</legend>';
    formHTML += '<table>';
    formHTML += '<tr><td><label>Username:</label></td><td><input id="username" type="text" />';
    formHTML += '<tr><td><label>Password:</label></td><td><input id="password" type="password" />';
    formHTML += '<tr><td><label>Confirm Password:</label></td><td><input id="conpassword" type="password" />';
    formHTML += '</table>';
    formHTML += '</fieldset>';
    formHTML += '</form>';
    formHTML += '</div>';
    $('#formContent').html(formHTML);
    $('#formModel').modal('show');
    $('#saveForm').unbind('click');
    $('#saveForm').bind('click', function () {
        var employeeCreate = {
            "requestType": "create",
            "jobTitle": $('#jobTitle').val(),
            "firstName": $('#fname').val(),
            "lastName": $('#lname').val(),
            "address": $('#address').val(),
            "zip": $('#zip').val(),
            "state": $('#state').val(),
            "phoneNumber": $('#phonenumber').val(),
            "username": $('#username').val(),
            "password": $('#password').val()
        }
        console.log(employeeCreate);
        $.post('./employee', employeeCreate).done(function (json) {
            loadEmployee();
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#formModel').modal('hide');
    });
}

function deleteEmployee(node) {
    $('#confirmContent').html('Are you sure you want to delete employee: ' + empjson.employees[node].lastName + ', ' + empjson.employees[node].firstName + '?');
    $('#confirmModal').modal('show');
    $('#confirmed').unbind('click');
    $('#confirmed').bind('click', function () {
        var emp = {
            "requestType": "delete",
            "_id": empjson.employees[node]._id
        }
        $.post('./employee', emp).done(function (json) {
            loadEmployee();
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#confirmModal').modal('hide');
    });
};

function displayEmpInfo(node) {
    $("#employeeInfo"+node).toggle();
    return false;
}

function changePassword(node) {
    var formHTML = '';
    $('#formTitle').html('Change Password for' + empjson.employees[node].username);
    formHTML += '<div style="width:500px">';
    formHTML += '<form class="employeeCForm">';
    formHTML += '<table>';
    formHTML += '<tr><td><label for="jobTitle">Current Password:</label></td><td><input id="jobTitle" type="text" /></td></tr>';
    formHTML += '<tr><td><label for="lastName">New Password:</label></td><td><input id="fname" type="text" /></td></tr>';
    formHTML += '<tr><td><label for="lastName">Confirm Password:</label></td><td><input id="lname" type="text" /></td></tr>';
    formHTML += '</table>';
    formHTML += '</form>';
    formHTML += '</div>';
    $('#formContent').html(formHTML);
    $('#formModel').modal('show');
    $('#saveForm').unbind('click');
    $('#saveForm').bind('click', function () {$('#formModel').modal('hide');})
}