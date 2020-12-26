<template>
 <div class="cart">
   <!-- 导航栏 -->
  <cart-nav-bar/>
  
  <!-- 购物车列表 -->
     <cart-list/>
 </div>
</template>

<script>

// 导入公子组件
import CartNavBar from './childComps/CartNavBar'

// 导入子组件
import CartList from './childComps/CartList'

export default {
    name: "Cart",
    components:{
      CartNavBar,
      CartList,
    
    }
  }
</script>

<style scoped>

</style>
