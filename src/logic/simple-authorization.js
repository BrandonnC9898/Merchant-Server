'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var configuration = require('../Data/Configuration');

function simple_authorization(enableCapture, simpleAuthorization, callback){
    try {
        var instance = getPaymentInstance();
        var requestObj = getRequestObj(simpleAuthorization, enableCapture);
		instance.createPayment(requestObj, callback);
    } catch (error) {
        console.log('\nException on calling the API : ' + error);
    }
}

function getPaymentInstance(){
    var configObject = new configuration();
    var apiClient = new cybersourceRestApi.ApiClient();
    return new cybersourceRestApi.PaymentsApi(configObject, apiClient);
}

function getRequestObj(simpleAuthorization, enableCapture){
    var requestObj = new cybersourceRestApi.CreatePaymentRequest();
    requestObj.clientReferenceInformation = getClientReferenceInformation(simpleAuthorization.clientReferenceInformation);
    requestObj.processingInformation = getProcessingInformation(enableCapture);
    requestObj.paymentInformation = getPaymentInformation(simpleAuthorization.paymentInformation);
    requestObj.orderInformation = getOrderInformation(simpleAuthorization.orderInformation, simpleAuthorization.billTo);
    return requestObj;
}

function getClientReferenceInformation(simpClientRefInfo){
    var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
    clientReferenceInformation.code = simpClientRefInfo.code;
    return clientReferenceInformation;
}

function getProcessingInformation(enableCapture){
    var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
    processingInformation.capture = false;
    if (enableCapture === true) {
        processingInformation.capture = true;
    }
    return processingInformation;
}

function getPaymentInformation(simpPaymentInformation){
    var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
    paymentInformation.card = getPaymentInformationCard(simpPaymentInformation.card);
    return paymentInformation;
}

function getPaymentInformationCard(card){
    var paymentInformationCard = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCard();
    paymentInformationCard.number = card.number;
    paymentInformationCard.expirationMonth = card.expMonth;
    paymentInformationCard.expirationYear = card.expYear;
    return paymentInformationCard;
}

function getOrderInformation(simpOrderInformation, billTo){
    var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
    orderInformation.amountDetails = getAmountDetails(simpOrderInformation.amountDetails);
    orderInformation.billTo = getBillTo(billTo);
    return orderInformation;
}

function getAmountDetails(amountDetails){
    var orderInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
    orderInformationAmountDetails.totalAmount = amountDetails.totalAmount;
    orderInformationAmountDetails.currency = amountDetails.currency;
    return orderInformationAmountDetails;
}

function getBillTo(billTo){
    var orderInformationBillTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
    var client = billTo.client;
    var location = billTo.location;
    orderInformationBillTo.firstName = client.firstName;
    orderInformationBillTo.lastName = client.lastName;
    orderInformationBillTo.address1 = location.address;
    orderInformationBillTo.locality = location.locality;
    orderInformationBillTo.administrativeArea = location.administrativeArea;
    orderInformationBillTo.postalCode = location.postalCode;
    orderInformationBillTo.country = location.country;
    orderInformationBillTo.email = client.email;
    orderInformationBillTo.phoneNumber = client.phoneNumber;
    return orderInformationBillTo;
}

module.exports.simple_authorization = simple_authorization;
