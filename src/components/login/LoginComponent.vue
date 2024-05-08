<template>
    <div class="w-100 register-user d-flex justify-content-center align-items-center">
        <div class="">
            <div class="card">
                <div class="card-body d-flex justify-content-center align-items-center">
                    <div class="d-flex justify-content-center align-items-center w-100 h-100">
                        <div class="w-100">
                            <h1 class="text-white">Iniciar Session!</h1>
                            <div class="w-100 pb-3 pt-5">
                                <input type="email" class="input" v-model="form.email" placeholder="Email">
                            </div>
                            <div class="w-100 pb-3 pt-2">
                                <input type="password" class="input" v-model="form.password" placeholder="Password">
                            </div>
                            <div class="w-100">
                                <button class="button button-primary w-100" :class="isValidForm ? '' : ' disabled ' " @click="isValidForm ? logIn() : () => {}">Iniciar</button>
                            </div>

                            <div class="w-100">
                                <button class="button button-primary w-100" @click="() => { $router.push({name:'register'})}">Registrar</button>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LoginService  from '@/services/login_service';
export default{
    data(){
        return{
            form:{
                email:'',
                password:''
            },
        }
    },
    computed:{
        isValidForm(){
            return this.form.email.length > 0, this.form.password.length > 0;
        }
    },
    methods:{
        logIn() {
            LoginService.logIn(this.form).then((response) => {
                if(response){
                    this.$router.push({name:'chat-list'});
                }
            })
      },        
    }
}
</script>