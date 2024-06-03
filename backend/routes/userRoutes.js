const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const generateToken = require('./jsonwebtokens');
const Router = express.Router();


Router.post('/register', async (req, res) => {

    let user = req.body; // it returns an object
    let email = await User.findOne({ email: user.email }); // if user exist then return user object else it return null.
    console.log("User Details : ", email);
    if (email) {
        res.send({ isUserExist: true });
    }
    else {
        // Technique 2 (auto-gen a salt and hash):
        const hashPassword = await bcrypt.hash(user.password, 10);

        // Store hash in your password DB.
        let newUser = await User.create({
            name: user.name,
            email: user.email,
            password: hashPassword
        });

        console.log(newUser);
        res.send({ isUserExist: false, userDetail: newUser });
    }
});

Router.post('/login', async (req, res) => {
    let user = req.body; // it returns an object
    console.log(user);
    let userInfo;
    try {
        userInfo = await User.findOne({ email: user.email }); // if user exist then return user object else it return null.
        console.log("User Details : ", userInfo);
    }
    catch (e) {
        console.log("Something went wrong");
    }
    if (!userInfo) {
        res.send({ isUserRegister: false });
    }
    else {
        let validatedPass = bcrypt
            .compare(user.password, userInfo.password)
            .catch((err) => {
                return res.send(err);
            });

        // console.log(validatedPass);

        let isValidate;

        isValidate = await validatedPass.then((res) => {
            // console.log(res);
            return res;
        });

        // console.log(isValidate);

        if (!isValidate) {
            return res.send({
                isUserRegister: true,
                isvalidPassword: false
            });
        }
        // Generate JWT
        let token = generateToken(userInfo);
        // res.send(`Token : ${token} , UserData : ${userInfo} , All done.`);
        res.send({
            userInformation: userInfo,
            Token: token,
            isUserRegister: true,
            isvalidPassword: true
        });
    }

});

module.exports = Router;