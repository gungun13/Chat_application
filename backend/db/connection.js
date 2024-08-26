const URL ="mongodb+srv://chat:chat123@chatcluster.aa01mbe.mongodb.net/?retryWrites=true&w=majority&appName=Chatcluster";
import mongoose from 'mongoose';

export const promise = mongoose.connect(URL);
promise.then(data=>{
    console.log("Connected to database")
}).catch(err=>{
    console.log("Error in connecting to database",err)
})

export default mongoose;

