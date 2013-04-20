var orderContainer = $('#orderContainer');

function loadOrder() {
    var orders;
    var data = {
        "requestType": "list",
    };
    resetAll();
    displayAjaxLoader();
    //orderContainer.html('<h1>Orders</h1>');
    //orderContainer.append('<button onclick="createOrder()" type="button" class="btn btnCreateOrder">Add New Order</button>');
    //ajax
    resetAll();
    orderContainer.slideDown();
    console.log('done');
}