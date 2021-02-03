const express = require('express');
const router = express.Router();
const simple_Authorization = require('../logic/simple-authorization');

const simpleAuthorization = require('../model/SimpleAuthorization');
const clientReferenceInformation = require('../model/SimpleAuthorization');
const paymentInformation = require('../model/SimpleAuthorization');
const orderInformation = require('../model/SimpleAuthorization');
const billTo = require('../model/SimpleAuthorization');
const amountDetails = require('../model/SimpleAuthorization');
const card = require('../model/SimpleAuthorization');

var clientInfo = new clientReferenceInformation.ClientReferenceInformation('TC50171_3');

router.get('/payment', (req, res) => {
    console.log('Simple Authorization');
    simple_Authorization.simple_authorization(false, simpleAuthorization);
});

module.exports = router;