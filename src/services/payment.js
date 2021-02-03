const express = require('express');
const router = express.Router();
const simple_Authorization = require('../logic/simple-authorization');
const capture_Payment = require('../logic/capture-payment');

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

var idAutPayment = '6123675158796014504005';

router.get('/payment', (req, res) => {
    console.log('Simple Authorization');
    simple_Authorization.simple_authorization(false, simpAuthorization);
    res.send('It works');
});

router.get('/capture', (req, res) => {
    console.log('Capture Payment');
    capture_Payment.capture_payment(clientInfo, orderInfo, billTo, idAutPayment);
    res.send('It works');
});

router.get('/paymentcapture', (req, res) => {
    console.log('Simple Authorization With Capture');
    simple_Authorization.simple_authorization(true, simpAuthorization);
    res.send('It works');
});

module.exports = router;