const express = require('express');
const router = express.Router();
const simple_Authorization = require('../logic/simple-authorization');
const capture_Payment = require('../logic/capture-payment');
const authorization_reversal = require('../logic/authorization-reversal');
const refund_payment = require('../logic/refund-payment');

const simpleAuthorization = require('../model/SimpleAuthorization');
const clientReferenceInformation = require('../model/ClientReferenceInformation');
const paymentInformation = require('../model/PaymentInformation');
const orderInformation = require('../model/OrderInformation');
const billTo = require('../model/BillTo');
const amountDetails = require('../model/AmountDetails');
const card = require('../model/Card');

var clientInfo = new clientReferenceInformation.ClientReferenceInformation('TC50171_3');
var myCard = new card.Card('4111111111111111', '12', '2031');
var paymentInfo = new paymentInformation.PaymentInformation(myCard);
var amountDet = new amountDetails.AmountDetails('0.01', 'USD');
var orderInfo = new orderInformation.OrderInformation(amountDet);
var client = new billTo.Client(0, 'John', 'Doe', 'test@cybs.com', '4158880000');
var location = new billTo.Location('1 Market St', 'san francisco', 'CA', '94105', 'US');
var myBillTo = new billTo.BillTo(client, location);
var simpAuthorization = new simpleAuthorization.SimpleAuthorization(clientInfo, paymentInfo, orderInfo, myBillTo);

var idAutPayment = '';

router.get('/payment', (req, res) => {
    console.log('Simple Authorization Test');
    simple_Authorization.simple_authorization(false, simpAuthorization, (error, data, response) => {
        printResults(error, data, response);
        res.json({error: error, data: data, response: response});
    });
});

router.get('/capture', (req, res) => {
    console.log('Capture Payment Test');
    simple_Authorization.simple_authorization(false, simpAuthorization, (error, data, response) => {
        idAutPayment = data['id'];
        capture_Payment.capture_payment(clientInfo, orderInfo, billTo, idAutPayment, (error, data, response) => {
            printResults(error, data, response);
            res.json({error: error, data: data, response: response});
        });
    });
});

router.get('/payment/capture', (req, res) => {
    console.log('Simple Authorization With Capture Test');
    simple_Authorization.simple_authorization(true, simpAuthorization, (error, data, response) => {
        printResults(error, data, response);
        res.json({error: error, data: data, response: response});
    });
});

router.get('/reversal', (req, res) => {
    console.log('Authorization Reversal Test');
    simple_Authorization.simple_authorization(false, simpAuthorization, (error, data, response) => {
        idAutPayment = data['id'];
        authorization_reversal.authorization_reversal(clientInfo, orderInfo, idAutPayment, (error, data, response) => {
            printResults(error, data, response);
            res.json({error: error, data: data, response: response});
        });
    });
});

router.get('/refund', (req, res) => {
    console.log('Refund a Payment Test');
    simple_Authorization.simple_authorization(true, simpAuthorization, (error, data, response) => {
        idAutPayment = data['id'];
        refund_payment.refund_payment(clientInfo, orderInfo, idAutPayment, (error, data, response) => {
            printResults(error, data, response);
            res.json({error: error, data: data, response: response});
        });
    });
});

function printResults(error, data, response){
    if (error) {
        console.log('\nError : ' + JSON.stringify(error));
    }
    else if (data) {
        console.log('\nData : ' + JSON.stringify(data));
    }
    console.log('\nResponse : ' + JSON.stringify(response));
    console.log('\nResponse Code of the Transaction : ' + JSON.stringify(response['status']));
    console.log('\nID of the Payment : ' + data['id']);
}

module.exports = router;