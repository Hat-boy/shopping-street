<template>
    <div class="tab-control">
        <div class="tab-control-item" 
        v-for="(item,index) in titles" :key="index"
        :class="{active:index==currentindex}"
        @click="itemclick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return{
            currentindex:0
        }
    },
    methods:{
        itemclick(index){
            // console.log('子'+index);
             this.currentindex=index
             this.$emit('tabclick',index)
             
        }
    }
}
</script>

<style>
    .tab-control{
        display: flex;
        text-align: center;
        background-color:#fffdfd;
       
    }
    .tab-control-item{
        flex: 1;
        padding: 10px 0;
        font-size: 16px;  
    }
    
    .active{
        color: var(--color-high-text);
        
    }
    .active span{
         border-bottom: 2px solid var(--color-high-text);
         padding: 5px;
    }
   
</style>