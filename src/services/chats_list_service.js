import axios from 'axios';
import OAuth from '@/model/oauth';
import router from '@/router/router';
export default class ChatsListService {
    static async getAll() {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${OAuth.getAccessToken()}`
                }
            };            
            const response = await axios.get(`${process.env.VUE_APP_API_URL}customer/chat/get-all`, config).catch((error) => {
                console.log(error);

                return false;
            });
            if(typeof(response) === "undefined" || !response){
                router.push({name:'login'});
                return;
            }
            return JSON.stringify(response.data.data);
        } catch (error) {
            if(typeof(response) === "undefined"){
                router.push({name:'login'});
            }
        }
    }
}