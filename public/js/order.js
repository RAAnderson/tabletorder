var orderContainer = $('#orderContainer');

// function loadOrder() {
//     var orders;
     var data = {
        "requestType": "list",
    };
//     resetAll();
//     displayAjaxLoader();
//     //orderContainer.html('<h1>Orders</h1>');
//     //orderContainer.append('<button onclick="createOrder()" type="button" class="btn btnCreateOrder">Add New Order</button>');
//     //ajax
//     resetAll();
//     orderContainer.slideDown();
//     console.log('done');
// }

function loadOrder() {
    $.post('http://localhost:5010/order', data).done(function (res) {
        // var orderList = res.orders;
        // console.log(orderList);
        // console.log(res.orders[0]);

        displayOrders(res);

    }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
    resetAll();
    orderContainer.slideDown();
    console.log('done');
}


function displayOrders(data){
        var templater = $('#rick_orderTemplate').html();
        var htmler = Mustache.to_html(templater, data);
        $('#rick_orderList').html(htmler);
    };