<template>
    <div class="w-100 home-page d-flex justify-content-center align-items-center">
      <div class="col-12 col-md-6 col-lg-6">
        <LoginComponent/>
      </div>
    </div>
  </template>
  
  <script>
  import io from 'socket.io-client';
  
  import LoginComponent from '@/components/login/LoginComponent.vue';
  import LoginService from '@/services/login_service';
  export default {
    name:'LoginPage',
    components:{
      LoginComponent,
    },
    data() {
      return {
        username: '',
        messageText: '',
        chatHistory: [],
        registered: false,
        socket: null,
      };
    },
    mounted(){
      this.isLoggedIn();
    },
    methods: {
      registerUser() {
        if (this.username.trim() !== '') {
          this.registered = true;
          this.socket = io('http://127.0.0.1:8000');
          this.socket.emit('register', this.username);
          this.socket.on('chat message', message => {
            this.chatHistory.push(message);
          });
        }
      },
      sendMessage() {
        if (this.messageText.trim() !== '') {
          const message = {
            sender: this.username,
            text: this.messageText,
            timestamp: new Date().toLocaleTimeString()
          };
          this.socket.emit('chat message', message);
          this.chatHistory.push(message);
          this.messageText = '';
        }
      },
      handleFileUpload(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
          const message = {
            sender: this.username,
            text: reader.result,
            timestamp: new Date().toLocaleTimeString(),
            isFile: true
          };
          this.socket.emit('chat message', message);
          this.chatHistory.push(message);
        };
        reader.readAsDataURL(file);
      },

      isLoggedIn(){
        LoginService.isLoggedIn().then((response) => {
          if(typeof(response) !== "undefined" && response){
            this.$router.push("/chats-list");   
          }
        });
      },      
    },
  };
  </script>
  
  <style lang="scss" scoped>
    .home-page{
      height: 100vh;
    }

  </style>
  