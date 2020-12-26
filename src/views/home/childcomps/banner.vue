<template>
   <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a href="javascript:;" >
          <img :src="item.image" alt="" @load="imgload">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "components/common/swiper"

export default {
    name:'Banner',
    components:{
        Swiper,
        SwiperItem
    },
    props:{
       banners:{
           type:Array,
           default(){
               return []
           }
       }
    },
    data(){
      return{
        isload:false
      }
    },
    methods:{
      imgload(){
        // 利用节流阀只让它发送一次emit事件
        if(!this.isload){
          // console.log('轮播图加载完成了');
          this.$emit('swiperimgload')
          this.isload=true
        }
        
      }
    }
}
</script>

<style>

</style>