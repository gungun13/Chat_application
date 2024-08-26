import mongoose from "../db/connection.js";

const Schema = mongoose.Schema; 

const groupSchema=new Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    members:{type:[String],required:true},
})

export const groupModel=mongoose.model('group',groupSchema);