<template>
  <div id="home">
     <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物街</div>
    </nav-bar>
  <!-- 重新插一个tapcontrol -->
    <tab-control class="re-tab-control" v-show="isfixed"
    :titles="['流行','经典','新款']"
    @tabclick="tabclick"
    ref="retabcontrol" />
    <!-- 重新插入的tabcontrol结束 -->
    <!-- batter-scroll滚动插件 -->
   <scroll class="content" ref="scroll" 
    :probe-type="3"
    :pull-up-load="true"
    @scroll="contentscroll"
    @pullingUp="loadmore">
    <!-- 轮播图 -->
    <banner :banners="banners" class="banner" @swiperimgload="swiperimgload"></banner>
    <!-- 推荐栏 -->
    <recommend :recommends="recommends"/>
    <!-- 流行栏 -->
    <fashion/>
    <!-- tab栏切换栏 -->
    <tab-control class="tab-control" 
    :titles="['流行','经典','新款']"
    @tabclick="tabclick"
    ref="tabcontrol"/>
    <!-- goods商品列表 -->
    <goods-list :goods="goods[currenttype].list"/>
   </scroll>
   <!-- 返回顶部 -->
   <back-top @click.native="topclick" v-show="isshow"/>
  </div>
</template>

<script>
// 导入公共子组件
 import NavBar from 'components/common/navbar/NavBar'
 import Scroll from 'components/common/scroll/Scroll'

 import TabControl from 'components/content/tabControl/TabControl'
 import GoodsList from 'components/content/goods/GoodsList'
 import BackTop from 'components/content/backTop/BackTop'
 
// 导该首页的子组件
 import Banner from 'views/home/childcomps/banner'
 import Recommend from 'views/home/childcomps/Recommend'
 import Fashion from './childcomps/Fashion.vue'
// 导入方法
 import {getHomeMultidata,getHomeGoods} from 'network/home'
 import {debounce} from 'common/utils'
 import {itemImgListenerMixin} from 'common/mixin'

  export default {
    name: "Home",
    components: {
     NavBar,
     TabControl,
     Scroll,
     BackTop,
     GoodsList,
     Banner,
     Recommend,
     Fashion,
     
    },
    mixins:[itemImgListenerMixin],
    data(){
      return{
        // result:null
        banners:[],
        recommends:[],
        goods:{
          'pop':{page:0,list:[]},
          'new':{page:0,list:[]},
          'sell':{page:0,list:[]},
        },
        // 默认currentype为pop数据
        currenttype:'pop',
        isshow:false,
        taboffsetTop:0,
        isfixed:false,
        saveY:0,
        
      }
    },

     // 当组件创建完成后，立马就把后台数据请求过来
    created(){
      // 请求多个数据在methods里再封装一层,在methods方法里调用的函数需要加this
     this.getHomeMultidata()
      // 请求goods商品数据
     this.getHomeGoods('pop')  
     this.getHomeGoods('new')  
     this.getHomeGoods('sell') 
    },
    mounted(){
      // 用全局事件bus监听imgload事件，已被封装到混入方法中
     },
    destroyed(){
      // console.log('home destroyed');
    },
    activated(){
      // console.log('进入该组件');
      this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()//最好再调用refresh函数刷新一次
    },
    deactivated(){
      // console.log('离开该组件');
      this.saveY=this.$refs.scroll.scroll.y
      // console.log(this.saveY);

      // 取消itemimgload的全局事件的监听
      this.$bus.$off('itemimgload',this.itemImgListener)
    },
    

  methods:{
 // 事件监听的方法
      
      // 请求tabcontrol当前被点击栏下的数据
      tabclick(index){
        // console.log(index);
        switch (index){
          case 0:
            this.currenttype='pop'
            break
            case 1:
              this.currenttype='sell'
              break
              case 2:
                this.currenttype='new'
                break
        }
        this.$refs.retabcontrol.currentindex=index
        this.$refs.tabcontrol.currentindex=index
        
      },
      // 返回到顶部，且返回时长为500ms
      topclick(){
        // 拿到scroll组件里的scroll对象里的scrollTo方法
        this.$refs.scroll.scroll.scrollTo(0,0,500)
      },
      // 监听页面滚动
      contentscroll(position){
        // 是否显示返回BackTop按钮
        this.isshow=(-position.y)>1000
        // 判断滚动值是否大于tabcontrol的offset值
        this.isfixed=(-position.y)>this.taboffsetTop
      },
      // 上拉加载更多图片
      loadmore(){
        // console.log('上拉加载更多');
        this.getHomeGoods(this.currenttype)
      },
      // tabcontrol吸顶灯效果
      swiperimgload(){
        // 拿到tabcontrol组件的setoffTop值
        this.taboffsetTop=this.$refs.tabcontrol.$el.offsetTop
      },
      
      // 请求数据的方法
      getHomeMultidata(){//请求多个数据
         getHomeMultidata().then(res=>{
        // console.log(res)
        // this.result=res
        this.banners=res.data.banner.list;
        this.recommends=res.data.recommend.list;
      })
      },
      getHomeGoods(type){//请求goods商品数据
      const page=this.goods[type].page+1
         getHomeGoods(type,page).then(res=>{
          //  console.log(res);
        // 保存请求过来的数据
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page+=1
          // 调用scroll组件里的scroll对象的finishPullUp,完成上拉加载更多
          this.$refs.scroll.scroll.finishPullUp()
        })
      }
    }
  }

</script>

<style scoped>
#home{
  /* 视口高度 ，及设备全屏高度*/
    height: 100vh;
    /* position: relative; */
    /* margin-top: 44px; */
}

 .nav-bar{
   background-color: var(--color-tint);
   color: white;
   /* position: fixed;
   top: 0;
   left: 0;
   right: 0; */
   /* position: sticky;
   top: 0;
   z-index: 99; */
   
 }

.re-tab-control{
  position: relative;
  z-index: 9;
  top: -2px;
  width: 100%;
  
}
 .content{
   position: absolute;
   top: 43px;
   bottom: 49px;
   overflow: hidden;
  
 }
</style>
