import axios from 'axios';

export const msgApiClient={
    async postMsg (URL,data){
        try{
            const response=await axios.post(URL,data)
            return response;
        }
        catch(err){
            console.log(err)
        }
    },

    async getMsg(URL,data){
        try{
            const response=await axios.post(URL,data)
            return response.data;
         }
         catch(err){
            console.log(err)
        }
    
}
}