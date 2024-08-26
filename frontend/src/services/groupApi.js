import axios from "axios";

export const groupApiClient = {
    async postGroup(URL, data) {
        try {
            const response = await axios.post(URL, data)
            return response;
        }
        catch (err) {
            console.log(err)
        }
    },

    async getGroups(URL) {
        try {
            const response = await axios.get(URL)
            return response;
        }
        catch (err) {
            console.log(err);
        }
    },

    async postGroupMsg(URL,data){
        try {
            const response = await axios.post(URL, data)
            return response;
        }
        catch (err) {
            console.log(err)
        }
    }
    
}