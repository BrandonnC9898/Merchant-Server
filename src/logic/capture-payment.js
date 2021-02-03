"use strict";

var cybersourceRestApi = require("cybersource-rest-client");
var configuration = require('../Data/Configuration');

function capture_payment(clientReferenceInformation, orderInformation, billTo, idAutPayment){
    try {
        var instance = getCaptureInstance();
        var requestObj = getRequestObj(clientReferenceInformation, orderInformation, billTo);
        instance.capturePayment(requestObj, idAutPayment, capturePaymentCall);
    } catch (error) {
        console.log("\nException on calling the API : " + error);
    }
}

function getCaptureInstance(){
    var configObject = new configuration();
    var apiClient = new cybersourceRestApi.ApiClient();
    return new cybersourceRestApi.CaptureApi(configObject, apiClient);
}

function getRequestObj(clientReferenceInformation, orderInformation, billTo){
    var requestObj = new cybersourceRestApi.CapturePaymentRequest();
    requestObj.clientReferenceInformation = getClientReferenceInformation(clientReferenceInformation);
    requestObj.orderInformation = getOrderInformation(orderInformation, billTo);
    return requestObj;
}

function getClientReferenceInformation(simpClientRefInfo){
    var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
    clientReferenceInformation.code = simpClientRefInfo.code;
    return clientReferenceInformation;
}

function getOrderInformation(simpOrderInformation, billTo){
    var orderInformation = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformation();
    orderInformation.amountDetails = getAmountDetails(simpOrderInformation.amountDetails);
    return orderInformation;
}

function getAmountDetails(amountDetails){
    var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidcapturesOrderInformationAmountDetails();
    orderInformationAmountDetails.totalAmount = amountDetails.totalAmount;
    orderInformationAmountDetails.currency = amountDetails.currency;
    return orderInformationAmountDetails;
}

function capturePaymentCall(error, data, response){
    if (error) {
        console.log('\nError : ' + JSON.stringify(error));
    }
    else if (data) {
        console.log('\nData : ' + JSON.stringify(data));
    }
    console.log('\nResponse : ' + JSON.stringify(response));
    console.log('\nResponse Code of Capture a Payment : ' + JSON.stringify(response['status']));
}

module.exports.capture_payment = capture_payment;