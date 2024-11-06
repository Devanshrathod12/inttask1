const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/formtabal").then(() => {
    console.log("Database successfully connected");
}).catch((err) => {
    console.log(err);
});

const Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    conformaddress: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User', 'Guest'],
        default: 'User'
    }
});

const User = new mongoose.model("User", Schema);

module.exports = User;
