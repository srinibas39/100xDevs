const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    firstName:String,
    lastName:String,
    email:{type:String , unique:true},
    password:String
},
{
    timestamps:true
})

const adminSchema = new Schema({
    firstName:String,
    lastName:String,
    email:{type:String,unique:true},
    password:String,
},{
    timestamps:true
})

const courseSchema = new Schema({
    title:String,
    description:String,
    imageUrl:String,
    price:Number,
    creatorId:objectId
},{
    timestamps:true
})

const purchaseSchema = new Schema({
     userId:objectId,
     courseId:objectId
},
{
    timestamps:true
})

const userModel = mongoose.model("user",userSchema);
const adminModel = mongoose.model("admin",adminSchema);
const courseModel = mongoose.model("course",courseSchema);
const purchaseModel = mongoose.model("purchase",purchaseSchema);


module.exports = {
    userModel : userModel,
    adminModel : adminModel,
    courseModel : courseModel,
    purchaseModel:purchaseModel
}


