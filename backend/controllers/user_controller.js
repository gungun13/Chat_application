import { UserModel } from "../models/user_schema.js";

export const addUser=async(req,res)=>{
    const {name,email,picture}=req.body;
    try{
        const UserExists=await UserModel.findOne({email:email});
        if(UserExists){
            return res.json({message:"User already exists"})
        }
        const newUser = { name, email, picture };
        const doc = await UserModel.create(newUser);
        return res.status(200).json({message:"user added"})

    }   
    catch(error){
        return res.status(500).json(error.message);
    } 
}

export const getUsers=async(req,res)=>{
    try{
        const users=await UserModel.find();
        return res.status(200).json(users);
        }
    catch(error){
        return res.status(500).json(error.message);
        }
}
