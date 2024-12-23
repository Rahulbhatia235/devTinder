const express = require('express')
const app = express();
const mongoDBConnect = require('../utils/database')
const User = require('../model/userSchema');
const {validateRequestBody} = require('../utils/validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const tokenKey = require('../config/constants')
const cookieParser = require('cookie-parser');
const {userAuth} = require('../utils/authentication')
const authRouter = require('../router/authRoute')
app.use(express.json())
app.use(cookieParser())

app.use('/', authRouter)

app.get("/users", async (req, res)=> {
    try {
        let condition ={}
        let {userId} = req.query
        if(userId) {
           condition = {_id:userId} 
        }
        console.log
        let userData = await User.find(condition)
        res.send(userData)

    } catch(exception) {
        res.status(400).send("ERROR: " + exception.message)
    }
})

app.get('/profile', userAuth, async (req,res) => {
    try {
        let userData = req.user;
        res.send(userData)
    } catch(exception) {
        res.status(400).send("ERROR: " + exception.message)
    }
})




app.post('/sendConnectionRequest', userAuth, async(req, res)=> {
    let user = req.user;
    res.send(`${user.firstName} ${user.lastName} sent connection request`)
})
    



app.listen(3003, ()=> {
    console.log("Server Listening on port 3003")
}); 


