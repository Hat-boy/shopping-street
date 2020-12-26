<template>
  <div class="bottom-bar">
      <div class="check-all">
          <check-button class="check-button"/>
          <span>全选</span>
      </div>
      <div>
          总计：{{totalPrice}}
      </div>
      <div class="total">
          去结算：{{totalLength}}
      </div>
  </div>
</template>

<script>

import CheckButton from './CheckButton'

export default {
    name:'BottomBar',
    components:{
        CheckButton
    },
    computed:{
        totalPrice(){
            return '￥'+this.$store.getters.cartList.filter(item=>item.isChecked)
            .reduce((prevalue,item)=>{
                return prevalue+item.count*item.price
            },0).toFixed(2)
        },
        totalLength(){
            return this.$store.getters.cartList.filter(item=>item.isChecked).length
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    position: fixed;
    bottom: 49px;
    left: 0;
    right: 0;

    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background-color: #eee; 
    
      
}
.check-all{
    display: flex;
    align-items: center;
   margin: 0 40px 0 10px;
}
.check-button{
    height: 20px;
    width: 20px;
    line-height: 20px;
    margin-right: 5px;
}
.total{
    position: absolute;
    top: 0;
    right: 0;
    background-color: orange;
    /* padding-left: 10px;
    padding-right: 10px; */
    padding: 0 10px;
    color: white;
}
</style>