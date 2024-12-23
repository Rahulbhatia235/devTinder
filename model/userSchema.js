const mongoose = require('mongoose');
const validator = require('validator');
const tokenKey = require('../config/constants')
let {Schema} = mongoose;
const jwt = require('jsonwebtoken');

const UserSchema = new Schema(
    {
        firstName:{
            required: true,
            type: String,
            minLength: 4,
            maxLength: 50  
        },
        lastName:{
            type: String,
            minLength: 4,
            maxLength: 50,
            
        },
        age:{
            type: Number,
            required: true
        },
        gender:{
            type: String,
            required: true,
        },
        emailId: {
            type: String,
            required: true,
            validate(value) {
                if(!validator.isEmail(value)) {
                    throw new Error("Invalid Email Id")
                }
            },
            unique: true
        },
        password: {
            required: true,
            type: String,
            validate(value) {
               if(!validator.isStrongPassword(value)) {
                    throw new Error("Provide a Strong Password")
                }
            }
        }

    },
    {
        collection: "user_collection"
    }
)

UserSchema.methods.getJWT = async function() {
    const userData = this;
    const tokenData = await jwt.sign({userId: userData._id}, tokenKey.token_key, {expiresIn:'3h'});
    console.log(tokenData)
    return tokenData
}

module.exports = mongoose.model("User", UserSchema)

