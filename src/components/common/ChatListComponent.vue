<template>
    <div class="w-100 d-flex justify-content-between align-items-center border-bottom" @click="$emit('onClick')">
        <div class="d-flex">
            <div class="d-flex justify-content-center align-items-center relative">
                <img class="avatar" src="https://www.transparentpng.com/download/user/gray-user-profile-icon-png-fP8Q1P.png" width="55" height="55">
                <div class="absolute chat-active"></div>
            </div>
            <div class="px-2 py-3">
                <div class="text-start">
                    <div class="w-100">
                        <span class="fw-bold">{{username}}</span>
                    </div>
                    <div class="w-100">
                        <small>Ahora</small>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <i class="fa-solid fa-arrow-right h3"></i>
        </div>
    </div>
</template>
<script>
    export default{
        components:{
        },

        props:{
            username:{
                type:String,
                required:true
            },

            id:{
                type:Number,
                required:true
            },
        }
    }
</script>
<style>
  .avatar{
    border-radius: 50%;
    border: 1px solid  black;
  }
</style>