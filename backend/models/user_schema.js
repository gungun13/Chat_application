import mongoose from "../db/connection.js";

const Schema=mongoose.Schema;
const userSchema=new Schema({
    name:{type:String, required:true },
    email:{type:String, required:true, unique: true},
    picture:{type:String, required:true}
    
});

export const UserModel=mongoose.model('User',userSchema);

