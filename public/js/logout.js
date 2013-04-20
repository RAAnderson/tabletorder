function loadLogout() {
    resetAll();
    $('#logoutContainer').slideDown();
    $('.navbar').slideUp();
    login = false;
};

$('#btnLoginPage').click(function () {
    loadLogin()
});