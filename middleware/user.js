const jwt = require("jsonwebtoken");
const {JWT_USER_PASSWORD} = require("../config");

function userMiddleware(req, res, next){
    const token = req.headers.token;
    const decode = jwt.verify(token, JWT_USER_PASSWORD);
    if(decode){
        req.userId = decode.Id;
        next()


    }
    else{
        res.status(403).json({
            Message : "you are not signed in"
        })
    }

}

module.exports = {
    userMiddleware : userMiddleware
}