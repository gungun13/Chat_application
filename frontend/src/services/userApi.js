import axios from 'axios';

export const apiClient={
    async post(URL,data){
        try{
            const response=await axios.post(URL,data)
            return response;
        }
        catch(err){
            console.log(err)
        }
    },
    async get(URL){
        try{
            const response=await axios.get(URL)
            return response;
            }
            catch(err){
                console.log(err)
            }
     },
}