import axios from 'axios';
import OAuth from '@/model/oauth';
import Swal from 'sweetalert2';
export default class LoginService {
    static async isLoggedIn() {
        
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${OAuth.getAccessToken()}`
                }
            };            
            const response = await axios.get(`${process.env.VUE_APP_API_URL}customer/me`, config).catch((error) => {
                console.log("ex",error);
                return false;
            });
            if(typeof(response) === 'undefined' || !response){
                return;
            }
            return JSON.stringify(response.data.success);
        } catch (error) {
            console.error('Error', error);
        }
    }

    static async logIn(data) {
        try {          
            const response = await axios.post(`${process.env.VUE_APP_API_URL}login`, data).catch((error) => {
                console.log(error);
                return;
            });
            
            if(typeof(response) === 'undefined'){
                Swal.fire('Error', "User or password don't exist!", 'error');
                return;
            }

            if(response.data.success){
                OAuth.setUser(response.data.data);
            }
            
            return response.data.success;
        } catch (error) {
            alert("aqui");
            return error;
        }
    }

    static async logOut() {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${OAuth.getAccessToken()}`
                }
            };            
            const response = await axios.get(`${process.env.VUE_APP_API_URL}customer/logout`, config);
            OAuth.removeSession();
            return response.data.success;
        } catch (error) {
            console.error('Error', error);
        }
    }
}