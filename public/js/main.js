/* load functions */
function loadDashboard() {
}
function loadCategories() {
	var categoriesList = $('#categories');
	var categories;
	resetAll();
	displayAjaxLoader();
	$.getJSON( '../json/category.json').done(function( json ) {
		categories = json;
		categoriesList.html(' ');
		for(var i=0; i<categories.category.length; i++)
		{
			categoriesList.append('<li><span class="categoryName">'+categories.category[i]+'</span><div class="btn-group"><button type="button" class="btn editCategory">Edit</button><button type="button" class="btn deleteCategory">Delete</button></div></li>')
		}
		categoriesList.append('<li><input type="text" data-provide="typeahead" /><div class="btn-group"><button type="button" class="btn newCategory">Add New Category</button></div></li>');
		resetAll();
		$('#categoriesContainer').slideDown();
		$('.editCategory').bind('click', function () {editCategory($(this))});
		$('.deleteCategory').bind('click', function () {deleteCategory($(this))});
		$('.newCategory').bind('click', function () {newCategory($(this))});
	}).fail(function( jqxhr, textStatus, error ) {console.log( "Request Failed: " + textStatus + ', ' + error);});
}
function loadTables() {
	var tableList = $('#tables');
	var tables;
	resetAll();
	displayAjaxLoader();
	$.getJSON( '../json/table.json').done(function( json ) {
		tables = json;
		tableList.html(' ');
		for(var i=0; i<tables.table.length; i++)
		{
			tableList.append('<li><span class="tableName">'+tables.table[i]+'</span><div class="btn-group"><button type="button" class="btn editTable">Edit</button><button type="button" class="btn deleteTable">Delete</button></div></li>')
		}
		tableList.append('<li><input type="text" data-provide="typeahead" /><div class="btn-group"><button type="button" class="btn newTable">Add New Table</button></div></li>');
		resetAll();
		$('#tablesContainer').slideDown();
		$('.editTable').bind('click', function () {editTable($(this))});
		$('.deleteTable').bind('click', function () {deleteTable($(this))});
		$('.newTable').bind('click', function () {newTable($(this))});
	}).fail(function( jqxhr, textStatus, error ) {console.log( "Request Failed: " + textStatus + ', ' + error);});
}
function loadMenuItems() {
	var menuItemList = $('#items');
	var menuItems;
	resetAll();
	$.getJSON( '../json/item.json').done(function( json ) {
		menuItem = json;
		menuItemList.html(' ');
		for(var i=0; i<menuItem.item.length; i++)
		{
			menuItemList.append('<div class="accordion" id="accordion3"><div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion2" href="#collapseOne">Artichoke Dip</a></div><div id="collapseOne" class="accordion-body collapse in"><div class="accordion-inner"><div class="btn-group"><button type="button" class="btn">Save</button><button type="button" class="btn">Delete</button></div></div></div></div>');
		}
		menuItemList.append('<li><input type="text" data-provide="typeahead" /><div class="btn-group"><button type="button" class="btn newStaff">Add New Staff</button></div></li>');
		resetAll();
		
		$('#itemsContainer').slideDown();
		$('.editMenuItem').bind('click', function () {editMenuItem($(this))});
		$('.deleteMenuItem').bind('click', function () {deleteMenuItem($(this))});
		$('.newMenuItem').bind('click', function () {newMenuItem($(this))});
	}).fail(function( jqxhr, textStatus, error ) {console.log( "Request Failed: " + textStatus + ', ' + error);});
}

function displayAjaxLoader() { $('#ajaxloader').slideDown(); }

function resetAll() {
    $('#loginContainer').slideUp();
	$('#dashboardContainer').slideUp();
	$('#categoriesContainer').slideUp();
	$('#tablesContainer').slideUp();
	$('#itemsContainer').slideUp();
	$('#empolyeeContainer').slideUp();
	$('#ajaxloader').slideUp();
}

/* Menu Click Events */
$('#home').click(function () {
	resetAll();
	$('#dashboardContainer').slideDown();
});
$('#navcategories').click(function () {
	loadCategories();
});
$('#navtables').click(function () {
	loadTables();
});
$('#navmenuItems').click(function () {
	loadMenuItems();
});
$('#navEmployee').click(function () {
    listEmployee();
});

/* Edit Click Events */
/* Category */
function editCategory(object) {
	var listItem = object.parents('li');
	var categoryName = listItem.children('.categoryName').text();
	listItem.html('<input type="text" data-provide="typeahead" value="'+categoryName+'" oldname="'+categoryName+'"/><span id="currentName"><div class="btn-group"><button type="button" class="btn saveEditCategory">Save</button><button type="button" class="btn cancelEditCategory">Cancel</button></div>');
	$('.saveEditCategory').bind('click', function () {saveCategory($(this))});
	$('.cancelEditCategory').bind('click', function () {cancelEditCategory($(this))});
	console.log('end edit');
}
function saveCategory(object) {
	var listItem = object.parents('li');
	var newCategoryName = listItem.children('input').val();
    var uid = 
	/* server stuff */
	listItem.html('<span class="categoryName">'+newCategoryName+'</span><div class="btn-group"><button type="button" class="btn editCategory">Edit</button><button type="button" class="btn deleteCategory">Delete</button></div>');
	$('.editCategory').bind('click', function () {editCategory($(this))});
	$('.deleteCategory').bind('click', function () {deleteCategory($(this))});
	//console.log('end save');
}
function cancelEditCategory(object) {
	var oldname = object.parents('li').children('input').attr('oldname');
	object.parents('li').html('<span class="categoryName">'+oldname+'</span><div class="btn-group"><button type="button" class="btn editCategory">Edit</button><button type="button" class="btn deleteCategory">Delete</button></div>');	
	$('.editCategory').bind('click', function () {editCategory($(this))});
	$('.deleteCategory').bind('click', function () {deleteCategory($(this))});
}
function deleteCategory(object) {
	var listItem = object.parents('li');
	var categoryName = listItem.children('.categoryName').text();
	$('#modalContent').html('Are you sure you want to delete category: '+ categoryName +'?')
	$('#confirmModal').modal('show');
	$('#confirmed').bind('click', function () {
		listItem.slideUp();
		/*server stuff*/
		$('#confirmModal').modal('hide');
	});
};
function newCategory(object) {
	var listItem = object.parents('li');
	var newCategoryName = listItem.children('input').val();
	/*Server Stuff*/
	listItem.html('<span class="categoryName">'+newCategoryName+'</span><div class="btn-group"><button type="button" class="btn editCategory">Edit</button><button type="button" class="btn deleteCategory">Delete</button></div>');
	listItem.parents('ul').append('<li><input type="text" data-provide="typeahead" /><div class="btn-group"><button type="button" class="btn newCategory">Add New Category</button></div></li>');	
	$('.editCategory').bind('click', function () {editCategory($(this))});
	$('.deleteCategory').bind('click', function () {deleteCategory($(this))});
	$('.newCategory').bind('click', function () {newCategory($(this))});
}
/* Table */
function editTable(object) {
	var listItem = object.parents('li');
	var tableName = listItem.children('.tableName').text();
	listItem.html('<input type="text" data-provide="typeahead" value="'+tableName+'" oldname="'+tableName+'"/><span id="currentName"><div class="btn-group"><button type="button" class="btn saveEditTable">Save</button><button type="button" class="btn cancelEditTable">Cancel</button></div>');
	$('.saveEditTable').bind('click', function () {saveTable($(this))});
	$('.cancelEditTable').bind('click', function () {cancelEditTable($(this))});
	console.log('end edit');
}
function saveTable(object) {
	var listItem = object.parents('li');
	var newTableName = listItem.children('input').val();
	/* server stuff */
	listItem.html('<span class="tableName">'+newTableName+'</span><div class="btn-group"><button type="button" class="btn editTable">Edit</button><button type="button" class="btn deleteTable">Delete</button></div>');
	$('.editTable').bind('click', function () {editTable($(this))});
	$('.deleteTable').bind('click', function () {deleteTable($(this))});
	//console.log('end save');
}
function cancelEditTable(object) {
	var oldname = object.parents('li').children('input').attr('oldname');
	object.parents('li').html('<span class="tableName">'+oldname+'</span><div class="btn-group"><button type="button" class="btn editTable">Edit</button><button type="button" class="btn deleteTable">Delete</button></div>');	
	$('.editTable').bind('click', function () {editTable($(this))});
	$('.deleteTable').bind('click', function () {deleteTable($(this))});
}
function deleteTable(object) {
	var listItem = object.parents('li');
	var tableName = listItem.children('.tableName').text();
	$('#modalContent').html('Are you sure you want to delete table: '+ tableName +'?')
	$('#confirmModal').modal('show');
	$('#confirmed').bind('click', function () {
		listItem.slideUp();
		/*server stuff*/
		$('#confirmModal').modal('hide');
	});
};
function newTable(object) {
	var listItem = object.parents('li');
	var newTableName = listItem.children('input').val();
	/*Server Stuff*/
	listItem.html('<span class="tableName">'+newTableName+'</span><div class="btn-group"><button type="button" class="btn editTable">Edit</button><button type="button" class="btn deleteTable">Delete</button></div>');
	listItem.parents('ul').append('<li><input type="text" data-provide="typeahead" /><div class="btn-group"><button type="button" class="btn newTable">Add New Table</button></div></li>');	
	$('.editTable').bind('click', function () {editTable($(this))});
	$('.deleteTable').bind('click', function () {deleteTable($(this))});
	$('.newTable').bind('click', function () {newTable($(this))});
}
/* Staff */
function editStaff(object) {
	var listItem = object.parents('li');
	var staffName = listItem.children('.staffName').text();
	listItem.html('<input type="text" data-provide="typeahead" value="'+staffName+'" oldname="'+staffName+'"/><span id="currentName"><div class="btn-group"><button type="button" class="btn saveEditStaff">Save</button><button type="button" class="btn cancelEditStaff">Cancel</button></div>');
	$('.saveEditStaff').bind('click', function () {saveStaff($(this))});
	$('.cancelEditStaff').bind('click', function () {cancelEditStaff($(this))});
	console.log('end edit');
}
function saveStaff(object) {
	var listItem = object.parents('li');
	var newStaffName = listItem.children('input').val();
	/* server stuff */
	listItem.html('<span class="staffName">'+newStaffName+'</span><div class="btn-group"><button type="button" class="btn editStaff">Edit</button><button type="button" class="btn deleteStaff">Delete</button></div>');
	$('.editStaff').bind('click', function () {editStaff($(this))});
	$('.deleteStaff').bind('click', function () {deleteStaff($(this))});
	//console.log('end save');
}
function cancelEditStaff(object) {
	var oldname = object.parents('li').children('input').attr('oldname');
	object.parents('li').html('<span class="staffName">'+oldname+'</span><div class="btn-group"><button type="button" class="btn editStaff">Edit</button><button type="button" class="btn deleteStaff">Delete</button></div>');	
	$('.editStaff').bind('click', function () {editStaff($(this))});
	$('.deleteStaff').bind('click', function () {deleteStaff($(this))});
}
function deleteStaff(object) {
	var listItem = object.parents('li');
	var staffName = listItem.children('.staffName').text();
	$('#modalContent').html('Are you sure you want to delete staff: '+ staffName +'?')
	$('#confirmModal').modal('show');
	$('#confirmed').bind('click', function () {
		listItem.slideUp();
		/*server stuff*/
		$('#confirmModal').modal('hide');
	});
};
function newStaff(object) {
	var listItem = object.parents('li');
	var newStaffName = listItem.children('input').val();
	/*Server Stuff*/
	listItem.html('<span class="staffName">'+newStaffName+'</span><div class="btn-group"><button type="button" class="btn editStaff">Edit</button><button type="button" class="btn deleteStaff">Delete</button></div>');
	listItem.parents('ul').append('<li><input type="text" data-provide="typeahead" /><div class="btn-group"><button type="button" class="btn newStaff">Add New Staff</button></div></li>');	
	$('.editStaff').bind('click', function () {editStaff($(this))});
	$('.deleteStaff').bind('click', function () {deleteStaff($(this))});
	$('.newStaff').bind('click', function () {newStaff($(this))});
}

/* JSON Requests */
function getCategory() {
	var categories = "";
	$.getJSON( '../json/category.json').done(function( json ) {
		categories = json;
	}).fail(function( jqxhr, textStatus, error ) {console.log( "Request Failed: " + textStatus + ', ' + error);});
	return categories
}