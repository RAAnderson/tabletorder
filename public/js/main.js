function displayAjaxLoader() { $('#ajaxloader').slideDown(); }

function resetAll() {
    $('#ajaxloader').slideUp();
    $('#dashboardContainer').slideUp();
    $('#employeeContainer').slideUp();
    $('#itemsContainer').slideUp();
    $('#loginContainer').slideUp();
    $('#logoutContainer').slideUp();
    $('#orderContainer').slideUp();
    $('#receiptContainer').slideUp();
	$('#tablesContainer').slideUp();
}

/* Menu Click Events */
$('#home').click(function () {
    loadDashboard();
});
$('#navOrder').click(function () {
	loadOrder();
});
$('#navTables').click(function () {
	loadTables();
});
$('#navMenuItems').click(function () {
	loadMenuItems();
});
$('#navEmployee').click(function () {
    loadEmployee();
});
$('#navLogout').click(function () {
    loadLogout();
});