const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");

function adminMiddleware(req, res, next){
    const token = req.headers.token;
    const decode = jwt.verify(token, JWT_ADMIN_PASSWORD);
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
    adminMiddleware : adminMiddleware
}