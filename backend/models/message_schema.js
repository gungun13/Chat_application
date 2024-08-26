import mongoose from "../db/connection.js";

const Schema = mongoose.Schema; 

const msgSchema = new Schema({
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    message: { type: String, required: true },
    time: {  } 
});

export const msgModel = mongoose.model('Message', msgSchema); 
