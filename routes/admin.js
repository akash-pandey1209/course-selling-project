const { Router} = require("express");
const adminRouter = Router();
const {adminmodel, coursemodel} = require("../db");
const jwt = require("jsonwebtoken");
const {JWT_ADMIN_PASSWORD} = require("../config");
const { adminMiddleware } = require("../middleware/admin");




adminRouter.post("/signup", async function(req, res){

    const { email, password, firstName , lastName} = req.body;
    await adminmodel.create({
        email : email,
        password : password,
        firstName : firstName,
        lastName : lastName

    })



    res.json({
        message : "signup succeeded"
    })
    

})

adminRouter.post("/signin", async function(req, res){
    const {email, password} = req.body;

    const admin = await adminmodel.findOne({
        email : email,
        password : password

    });

    if (admin) {
        const token = jwt.sign({
            id : admin._id
        }, JWT_ADMIN_PASSWORD);


        res.json({
            token  : token
        })
    } else{
        res.status(403).json({
            message : "incorrect credentials"
        })
    }

    

}) 

adminRouter.post("/course",adminMiddleware, async function(req, res){
    const adminId = req.userId;


    const {title, description, imageurl, price} = req.body;

    const course = await coursemodel.create({
        title : title,
        description: description,
        imageurl : imageurl,
        price : price,
        creatorId : adminId
    }) 
    res.json({
        message : "course created",
        courseId : course._id

    })
    

})

adminRouter.put("/course",adminMiddleware, async function(req, res){
    const adminId = req.userId;

    const {title, description, imageurl, price, courseId} = req.body;

    const course = await coursemodel.updateOne({
        _id : courseId,
        creatorId : adminId
    
    }, {
        title : title,
        description: description,
        imageurl : imageurl,
        price : price,
    }) 
    res.json({
        message : "course updated",
        courseId : course._id

    })
    

})

adminRouter.get("/course/bulk",adminMiddleware, async function(req, res){

    const adminId = req.userId;
    const course = await coursemodel.find({
        creatorId : adminId
    })
    res.json({
        message : "course updated",
        course 

    })
    

})

module.exports = {
    adminRouter : adminRouter
}