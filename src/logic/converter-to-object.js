const simpleAuthorization = require('../model/SimpleAuthorization');
const clientReferenceInformation = require('../model/ClientReferenceInformation');
const paymentInformation = require('../model/PaymentInformation');
const orderInformation = require('../model/OrderInformation');
const billTo = require('../model/BillTo');
const amountDetails = require('../model/AmountDetails');
const card = require('../model/Card');

function getSimpleAutorization(body) {
    var clientInfo = getClientReferenceInformation(body);
    var paymentInfo = getPaymentInformation(body);
    var orderInfo = getOrderInformation(body);
    var myBillTo = getBillTo(body);
    return new simpleAuthorization.SimpleAuthorization(clientInfo, paymentInfo, orderInfo, myBillTo);
}

function getPaymentInformation(body) {
    return new paymentInformation.PaymentInformation(getCard(body));
}

function getOrderInformation(body) {
    return new orderInformation.OrderInformation(getAmountDetails(body));
}

function getClientReferenceInformation(body) {
    return new clientReferenceInformation.ClientReferenceInformation(body.code);
}

function getCard(body) {
    return new card.Card(body.number, body.expMonth, body.expYear);
}

function getBillTo(body) {
    return new billTo.BillTo(getClient(body), getLocation(body));
}

function getClient(body) {
    return new billTo.Client(0, body.firstName, body.lastName, body.email, body.phoneNumber);
}

function getLocation(body) {
    return new billTo.Location(body.address, body.locality, body.administrativeArea, body.postalCode, body.country);
}

function getAmountDetails(body) {
    return new amountDetails.AmountDetails(body.totalAmount, body.currency);
}

function getIdAuthPayment(body) {
    return body.idAuthPayment;
}

exports.getSimpleAutorization = getSimpleAutorization;
exports.getPaymentInformation = getPaymentInformation;
exports.getOrderInformation = getOrderInformation;
exports.getClientReferenceInformation = getClientReferenceInformation;
exports.getBillTo = getBillTo;
exports.getAmountDetails = getAmountDetails;
exports.getIdAuthPayment = getIdAuthPayment;