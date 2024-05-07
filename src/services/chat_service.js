import axios from 'axios';
import OAuth from '@/model/oauth';
import Swal from 'sweetalert2';
export default class ChatService {
    static async getById(id) {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${OAuth.getAccessToken()}`
                }
            };
            const response = await axios.get(`${process.env.VUE_APP_API_URL}customer/chat/get-by-id/${id}`, config);
            return JSON.stringify(response.data.data);
        } catch (error) {
            console.error('Error al enviar el registro:', error);
        }
    }


    static async getUserById(id) {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${OAuth.getAccessToken()}`
                }
            };            
            const response = await axios.get(`${process.env.VUE_APP_API_URL}customer/chat/get-user-info-by-id/${id}`, config);
            return JSON.stringify(response.data.data);
        } catch (error) {
            console.error('Error al enviar el registro:', error);
        }
    }    


    static async store(parms) {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${OAuth.getAccessToken()}`
                }
            };            
            const response = await axios.post(`${process.env.VUE_APP_API_URL}customer/chat/store`,parms, config);
            return JSON.stringify(response.data.data);
        } catch (error) {
            console.error('Error al enviar el registro:', error);
        }
    }
    static async flieUpload(parms) {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${OAuth.getAccessToken()}`
                }
            };            
            const response = await axios.post(`${process.env.VUE_APP_API_URL}customer/chat/file-upload`,parms, config).catch((error) => {
                Swal.fire('Error', error.toString(), 'error');
                return;
            });
            if(response.data.success){
                Swal.fire('Success', "Success!", 'success');
            }
            return JSON.stringify(response.data.data);
        } catch (error) {
            console.error('Error al enviar el registro:', error);
        }
    }
}