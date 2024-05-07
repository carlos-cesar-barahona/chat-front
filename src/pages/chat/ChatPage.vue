<template>
    <BasicLayout :headerTitle="headerName" @onClick="() => {$router.push({name:'chat-list'})}" :fullHeader="findChat">
        <template v-slot:right>
            <div @click="() => {findChat = !findChat}">
                <i class="fa-solid fa-magnifying-glass"></i>
            </div>
        </template>
        <template v-slot:full>
            <div class="d-flex  align-items-center w-100 px-2">
                <div class="px-2 py-2" @click="findChat = false">
                    <i class="fa-solid fa-close h3"></i>
                </div>
                <div class="w-100">
                    <input type="text" class="input-simple" placeholder="Buscar mensaje" v-model="filterText">
                </div>
            </div>
        </template>
        <template v-slot:body>
            <div class="chat-window">
                <div class="mb-3 text-right w-100 d-flex" v-for="item, index in chatHistoryFiltered" :key="index" :class="item.to_id == id ? 'sender' : 'reciver'">

                    <div class="w-75 text-white rounded py-2" :class=" item.type == typeMessage ? item.to_id == id ? 'bg-primary' : 'bg-secondary' : 'rounded'">
                        <div class="w-100 text-start px-1" v-if="item.type == typeMessage">
                            <span class="text">{{item.message}}</span>
                        </div>
                        <div v-else>
                            <img class="chat-img" :src="item.url" @click="imageSelected = item.url">
                        </div>
                    </div>
                    <div class="d-flex align-items-center px-1 " >
                        <small>{{formattedDate(item.created_at)}}</small>
                    </div>
                </div>
            </div>
            <div class="fixed bg-white bottom-0 right-0 w-100 border-top">
                <div class="w-100 d-flex align-items-center justify-content-between p-2">
                    <div class="col-10">
                        <input type="text" class="input-simple" v-model="form.message" @keyup.enter="store" placeholder="Ingrese su mensaje">
                    </div>
                    <div class="col-2 d-flex">
                        <div class="d-none">
                            <input type="file" id="fileInput" ref="fileInput" accept="image/png, image/jpeg, image/jpg" @change="flieUpload">
                        </div>
                        <div class="px-2">
                            <i class="fa-solid fa-paperclip h3" @click="$refs.fileInput.click()"></i>
                        </div>
                        <div @click="form.message.length > 0 && form.id > 0 ? store() : () =>{}">
                            <div class="">
                                <i class="fa-solid fa-paper-plane h3" :class="form.message.length > 0 && form.id > 0 ?  'text-info' : ''"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-100 h-100 chat-img-viewer d-flex align-items-center" v-if="imageSelected.length > 0">
                <div>
                    <div class="d-flex justify-content-end px-2">
                        <i class="fa-solid fa-close h3 text-white" @click="imageSelected = ''"></i>
                    </div>
                    <div clas="w-100">
                        <img class="chat-img" :src="imageSelected">
                    </div>
                </div>
            </div>
        </template>
    </BasicLayout>
</template>
<script>
    import BasicLayout from '@/layout/BasicLayout.vue';
    import ChatService from '@/services/chat_service';
    export default{
        name:'ChatPage',
        components:{
            BasicLayout,
        },
        props:{
            id:{
                type:Number,
                required:true,
            }
        },
        data() {
            return {
                chatHistory: [],
                user:{},
                form:{
                    id:this.id,
                    message:'',
                },
                filterText:'',
                findChat:false,

                typeMessage:1,
                typeFile:2,
                imageSelected:'',
            };
        },
        computed: {
            chatHistoryFiltered() {
                if(this.filterText == ''){
                    return this.chatHistory;
                }
                return this.chatHistory.filter(item => item.message.toLowerCase().includes(this.filterText.toLowerCase()));
            },

            headerName(){
                if(typeof(this.user) !== 'undefined' && typeof(this.user.name) !== 'undefined'){
                    return this.user.name;
                }

                return 'Cargando...';
            }
        },        
        mounted(){
            if(typeof(this.id) === "undefined"){
                this.$router.push({name:'chat-list'});
            }
            this.getByid();
            this.getUserInfo();
        },
        methods:{
            getByid(){
                ChatService.getById(this.id).then((response) => {
                    this.chatHistory = JSON.parse(response);
                });
            },

            getUserInfo(){
                ChatService.getUserById(this.id).then((response) => {
                    this.user = JSON.parse(response);
                });
            },            

            store(){
                ChatService.store(this.form).then((response) => {
                    console.log(response);
                    this.form.message = '';
                    this.getByid();
                });
            },            

            onClick(){

            },

            flieUpload(event){
                const file = event.target.files[0];
                if(!file){
                    return;
                }
                const formData = new FormData();
                formData.append('photo', file);
                formData.append('id', this.id);
                ChatService.flieUpload(formData).then((response) => {
                    console.log(response);
                    this.getByid();
                });
            },

            findMessage(){
                
            },

            formattedDate(value) {
                const date = new Date(value);
                const hour = date.getHours();
                const minute = date.getMinutes();
                return `${hour}:${minute}`;
            },
        }
    }
</script>
<style>
  .chat-window {
    height: 76vh;
    overflow-y: scroll;
    padding: 10px;
  }
  
  .sender {
    display: flex;
    justify-content: end;
  }
  
  .received {
    text-align: left;
  }
  
  .timestamp {
    font-size: 0.8em;
    color: #999;
  }

  .chat-img{
    width: 100%;
    height: 100%;
  }

  .chat-img-viewer{
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .chat-img-viewer > div{
    height: 250px;
  }

  .chat-img-viewer i{
    z-index: 9999;
  }  
</style>