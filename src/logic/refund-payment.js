'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var configuration = require('../Data/Configuration');

function refund_payment(clientReferenceInformation, orderInformation, idAutPayment){
    try {
        var instance = getRefundInstance();
        var requestObj = getRequestObj(clientReferenceInformation, orderInformation);
        instance.refundPayment(requestObj, idAutPayment, refundPaymentCall);
    } catch (error) {
        console.log('\nException on calling the API : ' + error);
    }
}

function getRefundInstance(){
    var configObject = new configuration();
    var apiClient = new cybersourceRestApi.ApiClient();
    return new cybersourceRestApi.RefundApi(configObject, apiClient);
}

function getRequestObj(clientReferenceInformation, orderInformation){
    var requestObj = new cybersourceRestApi.RefundPaymentRequest();
    requestObj.clientReferenceInformation = getClientReferenceInformation(clientReferenceInformation);
    requestObj.orderInformation = getOrderInformation(orderInformation);
    return requestObj;
}

function getClientReferenceInformation(simpClientRefInfo){
    var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
    clientReferenceInformation.code = simpClientRefInfo.code;
    return clientReferenceInformation;
}

function getOrderInformation(simpOrderInformation){
    var orderInformation = new cybersourceRestApi.Ptsv2paymentsidrefundsOrderInformation();
    orderInformation.amountDetails = getAmountDetails(simpOrderInformation.amountDetails);
    return orderInformation;
}

function getAmountDetails(amountDetails){
    var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformationAmountDetails();
    orderInformationAmountDetails.totalAmount = amountDetails.totalAmount;
    orderInformationAmountDetails.currency = amountDetails.currency;
    return orderInformationAmountDetails;
}

function refundPaymentCall(error, data, response){
    if (error) {
        console.log('\nError : ' + JSON.stringify(error));
    }
    else if (data) {
        console.log('\nData : ' + JSON.stringify(data));
    }
    console.log('\nResponse : ' + JSON.stringify(response));
    console.log('\nResponse Code of Refund a Payment : ' + JSON.stringify(response['status']));
}

module.exports.refund_payment = refund_payment;
