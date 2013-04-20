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
            employeeHTML += '<a href="#"><span uid="'+i+'" class="employeeName">' + employees[i].Username + '</span></a>';
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
    html += '<form id="employeeForm">';
    html += '<div id="leftCol">';
    html += '<img src="../img/user.png" />';
    html += '<button id="changePicture" type="button" class="btn">Change Picture</button>';
    html += '<fieldset id="userInfo" ><legend>User Info</legend>';
    html += 'Username:<input id="username" type="text" />';
    html += 'Password:<input id="username" type="text" />';
    html += 'Confirm Password:<input id="username" type="text" />';
    html += '<button type="button" class="btn">Change Password</button>';
    html += '</fieldset>';
    html += '</div>';
    html += '<fieldset id="empInfo"><legend>Employee Info</legend>';
    html += '<table>';
    html += '<tr><td><label for="jobTitle">Job Title:</label></td><td><input id="jobTitle" type="text" /></td></tr>';
    html += '<tr><td><label for="lastName">First Name:</label></td><td><input type="text" /></td></tr>';
    html += '<tr><td><label for="lastName">Last Name:</label></td><td><input type="text" /></td></tr>';
    html += '<tr><td><label for="address">Address:</label></td><td><input type="text" /></td></tr>';
    html += '<tr><td><label for="zip">City:</label></td><td><input type="text" /></td></tr>';
    html += '<tr><td><label for="state">State:</label></td><td><input style="width:20px;" type="text" /></td></tr>';
    html += '<tr><td><label for="zip">Zip:</label></td><td><input style="width:50px;" type="text" /></td></tr>';
    html += '<tr><td><label for="phonenumber">PhoneNumber:</label></td><td><input type="text" /></td></tr>';
    html += '</table>';
    html += '</fieldset>';
    html += '</form>';
    html += '</div>';
    html += '<div class="btn-group"><button onclick="saveEmployee()" type="button" class="btn saveEmployee">Save</button><button onclick="cancelEmployee()" type="button" class="btn cancelEmployee">Cancel</button></div><div class="clear"></div>';
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