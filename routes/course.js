const { Router } = require("express");
const { userMiddleware } = require("../middleware/user");
const { coursemodel, purchasemodel } = require("../db");

const courseRouter = Router();


courseRouter.post("/purchase",userMiddleware ,async function(req, res){
    const userId = req.userId;
    const courseId = req.body.courseId;
    await purchasemodel.create({
        userId ,
        courseId

    })

    //here you would expect the use to  pay for the course
    res.json({
        message : " you have successfully bought the course"
    })
})

courseRouter.get("/preview", async function(req, res){
    const courses = await coursemodel.find({});
    res.json({
        courses
    })
})




module.exports = {
    courseRouter : courseRouter
}
