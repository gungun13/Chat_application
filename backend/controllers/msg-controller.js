import { msgModel } from "../models/message_schema.js";
import { logger } from "../logger.js";

export const addMsg=async(req,res)=>{
    try{
        const msgObj=req.body;
        const msgDoc=await msgModel.create(msgObj);
        logger.info("message added successfully",{messageId:msgDoc._id}) 
        return res.status(200).json({message:"message added"});
    }
    catch(err){
        logger.error("error in adding message",{error:err})
        return res.status(500).json({message:"error in adding message"});
    }
}

export const getMessages = async (req, res) => {
    try {
        const { senderId, receiverId } = req.body;
        const messages = await msgModel.find({
            $or: [
                { senderId: senderId, receiverId: receiverId },
                { senderId: receiverId, receiverId: senderId }
            ]
        });
        // logger.info("messages fetched are",{messages})
        return res.status(200).json( messages);
    } catch (err) {
        logger.error("error in retrieving messages",{error:err})
        return res.status(500).json({ message: "Error in retrieving messages", error: err.message });
    }
};
