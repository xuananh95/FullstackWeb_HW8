var express = require("express");
var router = express.Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { loginValidation } = require("../validation/validate");
const jwt = require("jsonwebtoken");

// register user
router.post("/", async (req, res) => {
    // check email alrdy exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists");

    // hash password
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User();
    newUser.name = req.body.name;
    newUser.age = req.body.age;
    newUser.address = req.body.address;
    newUser.gender = req.body.gender;
    newUser.phone = req.body.phone;
    newUser.email = req.body.email;
    newUser.password = hashedPassword;

    try {
        const user = await newUser.save();
        res.send(user);
    } catch (err) {
        console.log(err);
        res.send(err.errors.name.message);
    }
});

// user login
router.post("/login", async (req, res) => {
    // validate user input
    const { error } = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // check if email in the system
    const userLogin = await User.findOne({ email: req.body.email });
    if (!userLogin) return res.status(400).send("Email does not exists!");

    // check password
    const checkedPassword = await bcrypt.compare(
        req.body.password,
        userLogin.password
    );
    if (!checkedPassword)
        return res.status(400).send("Passwords do not match!");

    // Generate JWT
    const token = jwt.sign({ _id: userLogin._id }, "some_secret");
    res.header("auth-token", token).send(token);
});

module.exports = router;
