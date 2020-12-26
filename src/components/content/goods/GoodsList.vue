<template>
  <div class="goods-list">
     <goods-list-item class="goods-item" v-for="(item,index) in goods" :key="index" :goodsitem="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
    name:'GoodsList',
    components:{
        GoodsListItem,
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style scoped>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.goods-item{
    width: 48%;
}
</style>