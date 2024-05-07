<template>
    <div class="w-100 register-user d-flex justify-content-center align-items-center">
        <div class="container">
            <div class="card">
                <div class="card-body d-flex justify-content-center align-items-center">
                    <div class="d-flex justify-content-center align-items-center w-100 h-100">
                        <div class="w-100">
                            <h1 class="text-white">Registrar usuario!</h1>
                            <div class="w-100 pb-3 pt-5">
                                <input type="email" class="input" v-model="form.email" placeholder="Email">
                            </div>
                            <div class="w-100 pb-3 pt-2">
                                <input type="password" class="input" v-model="form.password" placeholder="Password">
                            </div>                            
                            <div class="w-100 pb-3 pt-2">
                                <input type="text" class="input" v-model="form.name" placeholder="User name">
                            </div>
                            <div class="w-100">
                                <button class="button button-primary w-100" :class="isValidForm ? '' : ' disabled ' " @click="isValidForm ? registerUser : () => {}">Registrarse</button>
                            </div>
                            <div class="w-100">
                                <button class="button button-primary w-100" @click="() => { $router.push({name:'home'})}">Iniciar</button>
                            </div>                               
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import io from 'socket.io-client';
import RegisterService from '@/services/register_service';
export default{
    data(){
        return{
            form:{
                username:'',
                email:'',
                name:'',
            },
            socket: null,
            chatHistory:[],
            registerService : new RegisterService()
        }
    },
    computed:{
        isValidForm(){
            return this.form.email != '' && this.form.email.password != '' && this.form.username != '';
        }
    },
    methods:{
        registerUser() {
            RegisterService.register(this.form).then((response) => {
                if(response && response.success){
                    if (this.username.trim() !== '') {
                        this.registered = true;
                        this.socket = io('http://127.0.0.1:8000');
                        this.socket.on('chat message', message => {
                            this.chatHistory.push(message);
                        });
                    }
                }
            });
      },        
    }
}
</script>