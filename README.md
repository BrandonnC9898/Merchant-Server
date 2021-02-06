# Merchant-Server
This project is an integration with some of the Cybersource REST APIs through the CyberSource NodeJS SDK. It contains five kinds of transactions which are:
* Simple Authorization
* Capture a Payment
* Authorization with Capture
* Process an Authorization Reversal
* Refund a Payment
* Authorization with Decision Manager (custom setup)

## Run the project
* Clone or download this repository:
```
    $ git clone https://github.com/BrandonnC9898/Merchant-Server.git
```
* Install the dependencies:
```
    $ npm install
```
* Start the server:
```
    $ npm start
```
## Test the project
### Run default samples
You can execute predefined samples writing the next links in your browser:
```
    http://localhost:3000/test/payment
    http://localhost:3000/test/capture
    http://localhost:3000/test/payment/capture
    http://localhost:3000/test/reversal
    http://localhost:3000/test/refund
    http://localhost:3000/test/payment/decision
```
### Use REST web services
This repository contains a seller's website demo that you can use to try different data. Go to *web-client* and open the *index.html* file in your browser. In some cases, it is necessary to provide a *Request ID*. The result will be shown in the browser's console.
The seller's website demo uses the next routes:
```
    http://localhost:3000/payment
    http://localhost:3000/capture
    http://localhost:3000/payment/capture
    http://localhost:3000/reversal
    http://localhost:3000/refund
    http://localhost:3000/payment/decision
```