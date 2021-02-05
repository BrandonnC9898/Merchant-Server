var url = "http://localhost:3000/";
var txForm = document.getElementById("transaction-form");

txForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const request = {
        code: txForm['orderCode'].value,
        idAuthPayment: txForm['idTransaction'].value,
        number: txForm['cardNumber'].value,
        expMonth: txForm['expMonth'].value,
        expYear: txForm['expYear'].value,
        totalAmount: txForm['totalAmount'].value,
        currency: txForm['currency'].value,
        firstName: txForm['firstName'].value,
        lastName: txForm['lastName'].value,
        email: txForm['email'].value,
        phoneNumber: txForm['phoneNumber'].value,
        address: txForm['address'].value,
        locality: txForm['locality'].value,
        administrativeArea: txForm['admArea'].value,
        postalCode: txForm['postalCode'].value,
        country: txForm['country'].value
    };
    console.log(request);
    simpleAuthorization(request, getRoute());
});

function simpleAuthorization(data, route) {
    fetch(url + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

function getRoute() {
    switch (txForm['txType'].value) {
        case "simpleAuth":
            return 'payment';
        case "capturePayment":
            return 'capture';
        case "simpAuthCapture":
            return 'payment/capture'
        case "authReversal":
            return 'reversal';
        case "refundPayment":
            return 'refund';
        default:
            return '';
    }
}