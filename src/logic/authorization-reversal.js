'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var configuration = require('../Data/Configuration');

function authorization_reversal(clientReferenceInformation, reversalInformation, idAutPayment, callback){
    try {
        var instance = getReversalInstance();
        var requestObj = getRequestObj(clientReferenceInformation, reversalInformation);
		instance.authReversal(idAutPayment, requestObj, callback);
    } catch (error) {
        console.log('\nException on calling the API : ' + error);
    }
}

function getReversalInstance(){
    var configObject = new configuration();
    var apiClient = new cybersourceRestApi.ApiClient();
    return new cybersourceRestApi.ReversalApi(configObject, apiClient);
}

function getRequestObj(clientReferenceInformation, reversalInformation){
    var requestObj = new cybersourceRestApi.AuthReversalRequest();
    requestObj.clientReferenceInformation = getClientReferenceInformation(clientReferenceInformation);
    requestObj.reversalInformation = getReversalInformation(reversalInformation);
    return requestObj;
}

function getClientReferenceInformation(simpClientRefInfo){
    var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
    clientReferenceInformation.code = simpClientRefInfo.code;
    return clientReferenceInformation;
}

function getReversalInformation(simpReversalInformation){
    var reversalInformation = new cybersourceRestApi.Ptsv2paymentsidreversalsReversalInformation();
    reversalInformation.amountDetails = getAmountDetails(simpReversalInformation.amountDetails);
    return reversalInformation;
}

function getAmountDetails(amountDetails){
    var reversalInformationAmountDetails = new cybersourceRestApi.Ptsv2paymentsidreversalsReversalInformationAmountDetails();
    reversalInformationAmountDetails.totalAmount = amountDetails.totalAmount;
    return reversalInformationAmountDetails;
}

module.exports.authorization_reversal = authorization_reversal;
