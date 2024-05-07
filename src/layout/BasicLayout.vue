<template>
    <div>
        <HeaderComponent :text="headerTitle" @onClick="$emit('onClick')" :fullContent="fullHeader">
            <template v-slot:right>
                <slot name="right"></slot>
            </template>

            <template v-slot:full>
                <slot name="full"></slot>
            </template>            
        </HeaderComponent>
        <div class="container layout-body">
            <slot name="body"></slot>
        </div>
    </div>
</template>
<script>
import HeaderComponent from '@/components/common/HeaderComponent.vue';
export default{
    components:{
        HeaderComponent,
    },
    props:{
        headerTitle:{
            type:String,
            required:true,
        },
        fullHeader:{
            type:Boolean,
            default:false,
        }
    },

    data(){
        return{
            
        }
    }
}
</script>

<style>
    .layout-body{
        padding-top: 90px;
    }
</style>