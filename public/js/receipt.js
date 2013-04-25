var receiptContainer = $('#receiptContainer');
var receiptjson;

function displayReceipt(id) {
    var receiptHTML = "";
    var totalAmount = 0;
    var data = { "requestType": "read", "_id": id };
    resetAll();
    displayAjaxLoader();
    receiptContainer.html('<h1>Receipt</h1>');
    $.post('./order', data).done(function (json) {
        receiptjson = json;
        console.log(receiptjson);
        rHTML = '<div style="margin:0px auto;width:350px;background-color:white;position:relative;top:50px;padding:10px;">';
        rHTML += '<center><h1 style="margin:0px auto;">RECEIPT</h1></center>';
        rHTML += '<hr /><hr /><table>';
        for (var i = 0; i < receiptjson.tickets.length; i++)
        {
            rHTML += '<tr><td>' + receiptjson.tickets[i].menuItem.title + '</td><td style="text-align:right">$' + receiptjson.tickets[i].menuItem.price + '</td></tr>';
            totalAmount += parseFloat(receiptjson.tickets[i].menuItem.price);
        }
        rHTML += '</table><hr />';
        rHTML += '<table>';
        rHTML += '<tr><td>Subtotal</td><td style="text-align:right">$'+totalAmount+'</td></tr>';
        rHTML += '<tr><td>Taxes</td><td style="text-align:right">$'+ (Math.round((totalAmount*0.075) * 100) / 100)+'</td></tr>';
        rHTML += '<tr><td>Total</td><td style="text-align:right">$'+(totalAmount+(Math.round((totalAmount*0.075) * 100) / 100))+'</td></tr>';
        rHTML += '<tr><td style="font-size:24px">Tip</td><td style="text-align:right">__________</td></tr>';
        rHTML += '<tr><td style="font-size:24px">Grand Total</td><td style="text-align:right">__________</td></tr>';
        rHTML += '<tr><td style="font-size:24px">Signature</td><td style="text-align:right">________________________</td></tr>';
        rHTML += '</table>';
        rHTML += '<hr /><table><tr><td>Trans#</td>';
        rHTML += '<td style="text-align:right">' + receiptjson._id + '</td>';
        rHTML += '</tr>';
        rHTML += '<tr><td>Employee</td><td style="text-align:right">' + receiptjson.employeeId + '</td></tr>';
        rHTML += '<tr><td>Date</td><td style="text-align:right">' + convertDate(receiptjson.date) +'</td></tr></table><hr /><hr />';
        rHTML += '<center><h1 style="margin:0px auto;">Thank you!</h1></center></div>';

        receiptContainer.html(rHTML);
    }).fail(function (jqxhr, textStatus, error) { console.log("Request Failed: " + textStatus + ', ' + error); });
    resetAll();
    receiptContainer.slideDown();
    $('body').css('background-color', 'grey');
}