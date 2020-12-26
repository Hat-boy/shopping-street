<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
        <!-- 添加购物车的每件商品 -->
        <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item"/>
        <ul>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
            <li>{liebiao}</li>
           
        </ul>
    </scroll>
    <!-- 底部工具栏 -->
    <bottom-bar/>
        
  </div>
</template>

<script>

// 导入公共子组件
import Scroll from 'components/common/scroll/Scroll'

// 导入子组件
import CartListItem from './CartListItem'
import BottomBar from './BottomBar'

// 导入方法
import {mapGetters} from 'vuex'

export default {
    name:'CartList',
    components:{
        Scroll,
        CartListItem,
        BottomBar
    },
    computed:{
        ...mapGetters([
           'cartList'
        ])
    },
     activated(){
        // console.log('---');
        this.$refs.scroll.scroll.refresh()
    }

}
</script>

<style scoped>
.content{
    width: 100%;

   position: absolute;
   top: 43px;
   bottom: 89px;
   overflow: hidden;

}

</style>