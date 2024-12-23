const jwt = require('jsonwebtoken')
const tokenKey = require('../config/constants')
const User = require('../model/userSchema');

const userAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        if(!token) {
            throw new Error("Token Expired!! Login Again")
        }
        const decryptedToken = jwt.verify(token, tokenKey.token_key)
        console.log(decryptedToken);
        const userData = await User.find({_id:decryptedToken.userId})
        if(!userData) {
            throw new Error("User Not Found!")
        }
         
        req.user = userData[0];
        next()
    } catch(err) {
        res.status(400).send("Error : " + err.message)
    }
    
}


module.exports = {userAuth}