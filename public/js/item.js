var menuItemContainer = $('#itemsContainer');
var menuItemjson;

function loadMenuItems() {
    var menuItems;
    var data = { "requestType": "list" }
    resetAll();
    displayAjaxLoader();
    menuItemContainer.html('<h1>Menu Items</h1>');
    menuItemContainer.append('<button onclick="createMenuItem()" type="button" class="btn btnMenuItem">Add New Menu Item</button>');
    $.post('./menuItem', data).done(function (json) {
        var menuItemHTML = '';
        menuItemjson = json;
        menuItemHTML += '<ul id="MenuItem">';
        for (var i = 0; i < menuItemjson.menuItems.length; i++) {
            menuItemHTML += '<li>';
            menuItemHTML += '<a onclick="displayMenuItemInfo(' + i + ')" href="#"><span class="menuItemName">' + menuItemjson.menuItems[i].title + '</span></a>';
            menuItemHTML += '<div class="btn-group"><button onclick="updateMenuItem(' + i + ')" type="button" class="btn updateMenuItem">Update</button><button onclick="deleteMenuItem(' + i + ')" type="button" class="btn deleteMenuItem">Delete</button></div>';
            menuItemHTML += '<table id="menuItemInfo' + i + '" class="menuItemForm">';
            menuItemHTML += '<tr><td>Title: </td><td>' + menuItemjson.menuItems[i].title + '</td></tr>';
            menuItemHTML += '<tr><td>Price: </td><td>$' + menuItemjson.menuItems[i].price + '</td></tr>';
            menuItemHTML += '<tr><td>Description: </td><td>' + menuItemjson.menuItems[i].description + '</td></tr>';
            menuItemHTML += '</table>';
            menuItemHTML += '</li>';
        }
        menuItemHTML += '</ul>';
        menuItemContainer.append(menuItemHTML);
    }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
    resetAll();
    menuItemContainer.slideDown();
    console.log('done');
}

function createMenuItem() {
    var formHTML = '';
    $('#formTitle').html('Add New Menu Item');
    formHTML += '<table>';
    formHTML += '<tr><td>Table Name: </td><td><input id="menuItemTitle" type="text" /></td></tr>';
    formHTML += '<tr><td>Price: </td><td>$<input style="width:30px" id="menuItemPrice" type="text" /></td></tr>'
    formHTML += '<tr><td>Description: </td><td><textarea id="menuItemDescription" rows="4" cols="40"></textarea></td></tr>';
    formHTML += '</table>';
    $('#formContent').html(formHTML);
    $('#formModel').modal('show');
    $('#saveForm').unbind('click');
    $('#saveForm').bind('click', function () {
        var menuItemCreate = {
            "requestType": "create",
            "menuCatId": "1",
            "foodType": "default",
            "title": $('#menuItemTitle').val(),
            "description": $('#menuItemDescription').val(),
            "price": $('#menuItemPrice').val(),
            "menuStatus": "1",
            "menuType": "default",
            "customSeason": "",
            "ingredients": "default"
        }
        $.post('./menuItem', menuItemCreate).done(function (json) {
            loadMenuItems();
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#formModel').modal('hide');
    });
}

function updateMenuItem(node) {
    var formHTML = '';
    $('#formTitle').html('Update Menu Item');
    formHTML += '<table>';
    formHTML += '<tr><td>Table Name: </td><td><input id="menuItemTitle" type="text" value="' + menuItemjson.menuItems[node].title + '" /></td></tr>';
    formHTML += '<tr><td>Price: </td><td>$<input style="width:30px" id="menuItemPrice" type="text" value="' + menuItemjson.menuItems[node].price + '" /></td></tr>'
    formHTML += '<tr><td>Description: </td><td><textarea id="menuItemDescription" rows="4" cols="40">' + menuItemjson.menuItems[node].description + '</textarea></td></tr>';
    formHTML += '</table>';
    $('#formContent').html(formHTML);
    $('#formModel').modal('show');
    $('#saveForm').unbind('click');
    $('#saveForm').bind('click', function () {
        var menuItemUpdate = {
            "requestType": "update",
            "_id": menuItemjson.menuItems[node]._id,
            "menuCatId": "1",
            "foodType": "default",
            "title": $('#menuItemTitle').val(),
            "description": $('#menuItemDescription').val(),
            "price": $('#menuItemPrice').val(),
            "menuStatus": "1",
            "menuType": "default",
            "customSeason": "",
            "ingredients": "default"
        }
        $.post('./menuItem', menuItemUpdate).done(function (json) {
            loadMenuItems();
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#formModel').modal('hide');
    });
}

function deleteMenuItem(node) {
    $('#confirmContent').html('Are you sure you want to delete menu item: ' + menuItemjson.menuItems[node].title +'?');
    $('#confirmModal').modal('show');
    $('#confirmed').unbind('click');
    $('#confirmed').bind('click', function () {
     var menuItemDelete = {
            "requestType": "delete",
            "_id": menuItemjson.menuItems[node]._id
        }
        $.post('./menuItem', menuItemDelete).done(function (json) {
            loadMenuItems();
        }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
        $('#confirmModal').modal('hide');
    });
};

function displayMenuItemInfo(node) {
    $("#menuItemInfo" + node).toggle();
    return false;
}