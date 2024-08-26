import mongoose from "../db/connection.js";

const Schema = mongoose.Schema;

const groupMsgSchema = new Schema({
    senderId:{type:String,required:true},
    groupId: {type: String,required:true},
    message:{type:String,required:true},
    senderImage:{type:String}
});

export const groupMsgModel=mongoose.model('groupMessage',groupMsgSchema);
