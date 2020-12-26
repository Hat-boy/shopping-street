<template>
  <div class="bottom-bar">
      <div class="info">
          <div>
             <i class=" icon service"></i>
             <p>客服</p>
          </div>
          <div>
             <i class=" icon store"></i>
              <p>店铺</p>
          </div>
          <div>
             <i class=" icon collect"></i>
              <p>收藏</p>
          </div>
      </div>
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">立即购买</div>
      
  </div>
</template>

<script>
export default {
    name:'DetailBottomBar',
    methods:{
        addToCart(){
            this.$emit('addToCart')
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    height: 49px;
    width: 100%;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    
    display: flex;
    text-align: center;
    line-height: 49px;
    
}
.info{
    flex:2;
    display: flex;
    justify-content: space-around;
    font-size: 12px;
    line-height: 2;
    
}

.info .icon{
    display: block;
    height: 22px;
    width: 22px;
    background-color: blue;
    margin-top: 6px;
    background: url('~assets/img/detail/detail_bottom.png') no-repeat 0 0;
    background-size: 22px;
}
.info .service{
      background-position: 0 -54px;
}
.info .store{
      background-position: 0 -98px;
     
}

.cart{
    flex: 1;
    background-color:rgb(250, 170, 21);
    font-size: 16px;
    color: white;
}
.buy{
    flex: 1;
    background-color:var(--color-tint);
    font-size: 16px;
    color: white;
}

</style>