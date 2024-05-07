<template>
    <div class="w-100 py-3 text-start d-flex justify-content-between border-bottom fixed top-0 bg-white header">
        <div class="w-100  d-flex justify-content-between" v-if="!fullContent">
            <div class="d-flex">
                <div class="px-2" @click="$emit('onClick')">
                    <i class="fa-solid fa-arrow-left h3"></i>
                </div>
                <div class="">
                    <h4>{{text}}</h4>
                </div>
            </div>
            <div class="px-2">
                <slot name="right"></slot>
            </div>
        </div>
        <div class="w-100" v-else>
            <slot name="full"></slot>
        </div>
    </div>
</template>
<script>
    export default{
        props:{
            text:{
                type:String,
                required:true
            },
            fullContent:{
                type:Boolean,
                default:false,
            }
        }
    }
</script>

<style>
.header{
    z-index: 999;
}
</style>