
let validateUserPhoneNumber = (req, res, next) => {
    if(req.body.phone.startsWith("+32") == false ){
        res.json({message: "Wrong phone number format, must be formatted like '+32 444 44 44 44' "})
    }
    else {
        next();
    }
}

module.exports = validateUserPhoneNumber; 