const mongoose  = require("mongoose");
console.log("connected to db")

const schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;



const userSchema = new schema({
    email : {type : String, unnique : true},
    password : String,
    firstName : String,
    lastName : String,


});

const adminSchema = new schema({

    email : {type : String, unnique : true},
    password : String ,
    firstName : String,
    lastName : String,

});



const courseSchema = new schema({

    title : String,
    description : String,
    price : String,
    imageurl : String,
    creatorId : objectId,



});

const purchaseSchema = new schema({
    userId : objectId,
    courseId : objectId,



});

const usermodel = mongoose.model("user", userSchema);
const adminmodel =  mongoose.model("admin", adminSchema);
const coursemodel = mongoose.model("course", courseSchema);
const purchasemodel = mongoose.model("purchase", purchaseSchema);

module.exports = {
    usermodel,
    adminmodel,
    coursemodel,
    purchasemodel,


}