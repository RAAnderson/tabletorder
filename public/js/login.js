function loadLogin() {
    resetAll();
    $('#loginContainer').slideDown();
};

$('#btnLogin').click(function () {
    $('.navbar').slideDown();
    login = true;
    loadDashboard();
});