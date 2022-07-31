const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        required: true,
        type: String,
    },
    age: {
        required: true,
        type: Number,
        min: [0, "Age must be greater than 0!"],
    },
    address: {
        type: String,
    },
    email: {
        required: true,
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ],
    },
    phone: {
        type: String,
        match: [/^[0-9]*$/, "Please fill a valid phone number"],
        minLength: 9,
        maxLength: 12,
    },
    gender: {
        required: true,
        type: String,
        enum: ["male", "female", "undefined"],
    },
    password: {
        required: true,
        type: String,
        minLength: [6, "Password must be at least 6 characters"],
    },
});

module.exports = mongoose.model("user", userSchema);
