const express = require('express');
const authRouter = express.Router();
const {validateRequestBody} = require('../utils/validator')
const bcrypt = require('bcrypt')
const User = require('../model/userSchema');

authRouter.post("/signup",async (req, res)=> {
    try {
            //VALIDATE
        validateRequestBody(req)

        const {firstName, lastName, emailId, password, age, gender, } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);
        //encrypt password
        const user = new User({
            firstName,
            lastName,
            age,
            gender,
            emailId,
            password: hashedPassword
        })
    
        await user.save();
        res.send("Details Saved SUccessfully");
    
    } catch(exception) {
        res.status(400).send("ERROR: " + exception.message)
    }
})


authRouter.post("/login", async (req, res)=> {
    try {
        let {emailId, password} = req.body;
        if(!emailId || !password) {
            throw new Error("Credentials Required!!");
        }
        let userData = await User.findOne({emailId: emailId});
        if(!userData) {
            throw new Error("Invalid Credentails");

        } else {
            let isPasswordValid = await bcrypt.compare(password, userData.password)
            if(!isPasswordValid) {
                throw new Error("Invalid Credentails");
            } else {
                
                let tokenData = await userData.getJWT();
                res.cookie("token", tokenData);
                res.send("User Logged In SuccessFully!!!");
            }
        }
    } catch(exception) {
        res.status(400).send("ERROR: " + exception.message)
    }
})


module.exports = authRouter