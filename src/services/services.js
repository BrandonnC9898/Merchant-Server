const express = require('express');
const router = express.Router();
const simple_Authorization = require('../logic/simple-authorization');
const capture_Payment = require('../logic/capture-payment');
const authorization_reversal = require('../logic/authorization-reversal');
const refund_payment = require('../logic/refund-payment');
const convObj = require('../logic/converter-to-object');

router.post('/payment', (req, res) => {
    console.log('Simple Authorization');
    simple_Authorization.simple_authorization(false, convObj.getSimpleAutorization(req.body), (error, data, response) => {
        printResults(error, data, response);
        res.json({error: error, data: data, response: response});
    });
});

router.post('/capture', (req, res) => {
    console.log('Capture Payment');
    capture_Payment.capture_payment(convObj.getClientReferenceInformation(req.body), 
    convObj.getOrderInformation(req.body), convObj.getBillTo(req.body), convObj.getIdAuthPayment(req.body), 
    (error, data, response) => {
        printResults(error, data, response);
        res.json({error: error, data: data, response: response});
    });
});

router.post('/payment/capture', (req, res) => {
    console.log('Simple Authorization With Capture');
    simple_Authorization.simple_authorization(true, convObj.getSimpleAutorization(req.body), (error, data, response) => {
        printResults(error, data, response);
        res.json({error: error, data: data, response: response});
    });
});

router.post('/reversal', (req, res) => {
    console.log('Authorization Reversal');
    authorization_reversal.authorization_reversal(convObj.getClientReferenceInformation(req.body),
    convObj.getOrderInformation(req.body), convObj.getIdAuthPayment(req.body), (error, data, response) => {
        printResults(error, data, response);
        res.json({error: error, data: data, response: response});
    });
});

router.post('/refund', (req, res) => {
    console.log('Refund a Payment');
    refund_payment.refund_payment(convObj.getClientReferenceInformation(req.body),
    convObj.getOrderInformation(req.body), convObj.getIdAuthPayment(req.body), (error, data, response) => {
        printResults(error, data, response);
        res.json({error: error, data: data, response: response});
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