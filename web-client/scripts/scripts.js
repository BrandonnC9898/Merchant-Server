let txForm = document.getElementById("transaction-form");

txForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const request = {
        code: txForm['orderCode'],
        number: txForm['cardNumber'],
        expMonth: txForm['expMonth'],
        expYear: txForm['expYear'],
        totalAmount: txForm['totalAmount'],
        currency: txForm['currency'],
        firstName: txForm['firstName'],
        lastName: txForm['lastName'],
        email: txForm['email'],
        phoneNumber: txForm['phoneNumber'],
        address: txForm['address'],
        locality: txForm['locality'],
        administrativeArea: txForm['admArea'],
        postalCode: txForm['postalCode'],
        country: txForm['country']
    };
    createUser(request);
});

function createUser(data) {
    fetch("http://localhost:3000/user", {
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