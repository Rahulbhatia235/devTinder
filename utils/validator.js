const validateRequestBody = (req) => {
    const {firstName, lastName, emailId, password, gender} = req.body
    
    if(!firstName || firstName === "") {
        throw new Error("First Name is Required");
    } else if(!emailId || emailId === "") {
        throw new Error("Email Id is Required");
    } else if(!password || password === "") {
        throw new Error("Password is Required");
    } else if(!gender || gender === "") {
        throw new Error("Gender is Required");
    } else if(!(["male", "female", "other"].indexOf(gender.toLowerCase()) > -1)) {
        throw new Error("Invalid Gender Provided")
    }
}


module.exports = {validateRequestBody}