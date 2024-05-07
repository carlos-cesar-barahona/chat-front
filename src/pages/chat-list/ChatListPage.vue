<template>
    <BasicLayout headerTitle="Chats" @onClick="onClick">
        <template v-slot:right>
            <i class="fa-solid fa-right-from-bracket" @click="logOut"></i>
        </template>
        <template v-slot:body>
            <div class="w-100 pb-3">
                <input type="text" class="input-simple" placeholder="Buscar chat" v-model="filterText">
            </div>
            <div>
                <div v-for="user, index in chatFiltered" :key="index">
                    <ChatListComponent :username="user.name" :id="user.id" @onClick="goChat(user)"/>
                </div>
            </div>
        </template>
    </BasicLayout>
</template>
<script>
import ChatListComponent from '@/components/common/ChatListComponent.vue';
import BasicLayout from '@/layout/BasicLayout.vue';
import ChatsListService from '@/services/chats_list_service';
import LoginService from '@/services/login_service';

export default{
    components:{
        ChatListComponent,
        BasicLayout,
    },

    data(){
        return{
            chats:[],
            filterText:'',
        }
    },
    async mounted(){
        this.getAllChats();
        this.isLoggedIn();
    },
    computed: {
        chatFiltered() {
            if(this.filterText == ''){
                return this.chats;
            }
            return this.chats.filter(item => item.name.toLowerCase().includes(this.filterText.toLowerCase()));
        }
    },     

    methods:{
        getAllChats(){
            ChatsListService.getAll().then((response) => {
                this.chats = JSON.parse(response);
            });
        },
        onClick(){
            // alert("i");
        },

        logOut(){
            LoginService.logOut().then((response) => {
                console.log(response);
                this.$router.push({name:'home'});
            });
        },
        
        goChat(item){
            this.$router.push({ 
                name: 'chat',
                params: { 
                    id:item.id
                }
            });
        },

        isLoggedIn(){
            LoginService.isLoggedIn().then((response) => {
                if(typeof(response) === "undefined"){
                    this.$router.push({name:'login'});   
                }
            });
        } ,         
    },
}
</script>