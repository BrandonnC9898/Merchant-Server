class BillTo {
    constructor(client, location){
        this.client = client;
        this.location = location;
    }
}

class Client {
    constructor(clientId, firstName, lastName, email, phoneNumber){
        this.clientId = clientId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
    }
}

class Location {
    constructor(address, locality, administrativeArea, postalCode, country){
        this.address = address;
        this.locality = locality;
        this.administrativeArea = administrativeArea;
        this.postalCode = postalCode;
        this.country = country;
    }
}

exports.BillTo = BillTo;
exports.Client = Client;
exports.Location = Location;