import axios from 'axios';
import OAuth from '@/model/oauth';
import Swal from 'sweetalert2';
import router from '@/router/router';
export default class RegisterService {
    
    static async register(data) {
        try {
            const response = await axios.post(`${process.env.VUE_APP_API_URL}register`, data).catch((error) => {
                Swal.fire('Error', error.response.data.data.toString(), 'error');
            });
            if(response.data.success){
                OAuth.setUser(response.data.data);
                router.push({name:'chat-list'});
            }
        } catch (error) {
            console.error('Error al enviar el registro:', error);
        }
    }
}