const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    name:String,
    email:{type:String,unique:true},
    password:String,
},
    {
        timestamps : true
    }
)

const Todo = new Schema({
    userId:ObjectId,
    title:String,
    done:Boolean
},
{
    timestamps:true
}
)

const UserModel = mongoose.model("User",User)
const TodoModel = mongoose.model("Todo",Todo)

module.exports = {
    UserModel,TodoModel
}
