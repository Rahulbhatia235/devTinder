const mongoose = require('mongoose');

const mongoDBConnect = async ()=> {
    await mongoose.connect("mongodb://localhost:27017")
}


mongoDBConnect().then(()=> {
    console.log("Db connetion successFul")
}).catch(err=> {
    console.log("Could not connect to DB")

}) 

module.exports = mongoDBConnect

