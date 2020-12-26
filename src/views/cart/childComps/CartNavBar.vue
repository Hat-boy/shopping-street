<template>
  <div class="cart-nav-bar">
      <nav-bar>
          <div slot="center">购物车({{cartLength}})</div>
      </nav-bar>
  </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'

// 导入方法
import {mapGetters} from 'vuex'

export default {
    name:'CartNavBar',
    components:{
        NavBar
    },
    computed:{
        // 有可能很多地方都会用到cartList的长度，所以我们将获取长度的方法添加到个getters中
        //vue自带的mapGetters方法，将getters直接转为computed计算属性，不用通过$store去拿取
      ...mapGetters([
          'cartLength',
      ])
    }
}
</script>

<style scoped>
.cart-nav-bar{
    background-color:  var(--color-tint);
    color: white;
}

</style>