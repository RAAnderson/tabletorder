var employeeContainer = $('#employeeContainer');

function listEmployee() {
    resetAll();
    displayAjaxLoader();
    var employees
    employeeContainer.html('<h1>Employees</h1>');
    $.getJSON('../json/employee.json').done(function (json) {
        var employeeHTML='';
        employees = json;
        employeeHTML += '<ul id="employee">';
        for (var i = 0; i < employees.length; i++) {
            employeeHTML += '<li>';
            employeeHTML += '<span uid="'+i+'" class="employeeName">' + employees[i].Username + '</span>';
            employeeHTML += '<div class="btn-group"><button onclick="updateEmployee(' + i + ')" type="button" class="btn updateEmployee">Update</button><button type="button" class="btn deleteEmployee">Delete</button></div>';
            employeeHTML += '</li>';
        }
        employeeHTML += '<li id="last"><button onclick="createEmployee()" type="button" class="btn createEmployee">Add New Employee</button></div></li>';
        employeeContainer.append(employeeHTML);
    }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
    resetAll();
    console.log($('.createEmployee'));
    employeeContainer.slideDown();
    console.log('done');
}

function updateEmployee(node) {
    console.log(node);
}
/* Staff */
function createEmployee() {
    var listItem = $('#last');
    listItem.html('');
    var html = '';
    html += '<div>';
    html += 'Username:<input id="username" type="text" />';
    html += 'Job Title:<input id="jobTitle" type="text" />';
    html += 'First Name:<input type="text" />';
    html += 'Last Name:<input type="text" />';
    html += 'Address:<input type="text" />';
    html += 'Zip:<input type="text" />';
    html += 'State:<input type="text" />';
    html += 'PhoneNumber:<input type="text" />';
    html += 'Password:<input type="password" />';
    html += 'Confirm Password:<input type="password" />';
    html += '<div class="btn-group"><button onclick="saveEmployee()" type="button" class="btn saveEmployee">Save</button><button onclick="cancelEmployee()" type="button" class="btn cancelEmployee">Cancel</button></div>';
    html += '</div>';
    listItem.html(html);
}

function saveEmployee(node) {
    var username, jobTitle, firstName, lastName, address, zip, state, phoneNumber, password, confirmpassword;
    if (!node) {
        none = ' ';
    } else {
        none = ' ';
    }
    username = $('#username').val();
    jobTitle = $('#jobTitle').val();
    console.log(username + ' ' + jobTitle);
}

function cancelEditStaff(object) {
    var oldname = object.parents('li').children('input').attr('oldname');
    object.parents('li').html('<span class="staffName">' + oldname + '</span><div class="btn-group"><button type="button" class="btn editStaff">Edit</button><button type="button" class="btn deleteStaff">Delete</button></div>');
    $('.editStaff').bind('click', function () { editStaff($(this)) });
    $('.deleteStaff').bind('click', function () { deleteStaff($(this)) });
}
function deleteStaff(object) {
    var listItem = object.parents('li');
    var staffName = listItem.children('.staffName').text();
    $('#modalContent').html('Are you sure you want to delete staff: ' + staffName + '?')
    $('#confirmModal').modal('show');
    $('#confirmed').bind('click', function () {
        listItem.slideUp();
        /*server stuff*/
        $('#confirmModal').modal('hide');
    });
};