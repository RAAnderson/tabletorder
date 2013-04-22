function loadLogin() {
    resetAll();
    $('#loginContainer').slideDown();
};

$('#btnLogin').click(function () {
    var username, password, data;
    $('.alert').slideUp();
    username = $('#loginUsername').val();
    password = $('#loginPassword').val();
    loginData = {
        "requestType": "read"
        , "username": username
    };
    /*$.post('./employee', loginData).done(function (json) {
        if (password === json.password) {
            $('.navbar').slideDown();
            login = true;
            loadDashboard();
        } else {
            $('#loginContainer').append('<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button><strong>Incorrect Username and or password!</strong></div>');
        }
    }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });*/

    if (password === "password") {
        $('.navbar').slideDown();
        login = true;
        loadDashboard();
    } else {
        $('#loginContainer').append('<div class="alert alert-error"><button type="button" class="close" data-dismiss="alert">&times;</button>Username or password is incorrect!</div>');
    }
});