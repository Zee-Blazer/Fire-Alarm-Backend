const mongoose = require("mongoose");

const importantData = {
    type: String,
    // required: true
}

const clientSchema = mongoose.Schema({
    fullname: String,
    email: {
        unique: 1,
        type: String
    },
    buildingType: String,
    location: String,
    password: String,
    phone: String,
    ipAddress: String,
    apiLink: importantData,
    sections: [
        String
    ],
    status: Boolean
});

const Client = mongoose.model("Client", clientSchema);

module.exports = { Client };
