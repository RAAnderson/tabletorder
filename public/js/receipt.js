var receiptContainer = $('#receiptContainer');
var receiptjson;

function displayReceipt(id) {
    var receiptHTML = "";
    var data = { "requestType": "read", "_id": id };
    resetAll();
    displayAjaxLoader();
    receiptContainer.html('<h1>Receipt</h1>');

    $.post('./order', data).done(function (json) {
        receiptjson = json;
        console.log(receiptjson);
        /*receiptHTML = '<ul id="tables">';
        for (var i = 0; i < tablesjson.tables.length; i++) {
        console.log(receiptjson);
        }
        receiptHTML += '</ul>';
        tableContainer.append(receiptHTML);*/
    }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
    console.log(receiptjson);
    resetAll();
    receiptContainer.slideDown();
}