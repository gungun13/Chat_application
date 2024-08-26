import {groupModel}  from './../models/group_schema.js';
import { groupMsgModel } from '../models/groupMessage_schema.js';
import { logger } from '../logger.js';


export const addGroup=async(req,res)=>{
    try{
        const groupObj=req.body;
        const newGroup=await groupModel.create(groupObj);
        logger.info("group added successfully")
        return res.status(200).json({message:"group added", group: newGroup});
        }
        catch(err){
            logger.error("error in adding group");
            return res.status(500).json({message:"error in adding group"});
        }
}

export const getGroups=async(req,res)=>{
    try{
        const {userEmail}=req.params;
        const groups=await groupModel.find({members:userEmail});
        return res.status(200).json(groups);

    }
    catch(err){
        return res.json({message:"error in fetching groups"});
    }
}

export const addGroupMsg=async(req,res)=>{
    try{
        const obj=req.body;
        const newMsg=await groupMsgModel.create(obj);
        console.log(newMsg);
        return res.json({message:"new group message added"});
    }
    catch(err){
        return res.status(500).json({message:"error in adding group message"});
    }
}

export const getGroupMessages = async (req, res) => {
    try {
        const { groupId } = req.body;
        const messages = await groupMsgModel.find({groupId });
        console.log(messages);
        return res.status(200).json( messages);
    } catch (err) {
        console.error('Error retrieving messages:', err); // Log the actual error
        return res.status(500).json({ message: "Error in retrieving messages", error: err.message });
    }
};


