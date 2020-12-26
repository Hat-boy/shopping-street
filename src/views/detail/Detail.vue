<template>
  <div id="detail">
      <!-- 导航栏 -->
     <detail-nav-bar @titleClick="titleClick" ref="detailNavBar"/>
    <scroll class="content" ref="scroll"
    @scroll="contentScroll" :probeType='3'>
         <!-- 轮播图 -->
         <detail-banner :topImages="topImages"/>
         <!--商品基本信息 -->
         <detail-base-info :goodsInfo="goodsInfo" class="detail-base-info"/>
         <!-- 商家基本信息 -->
         <detail-shop-info :shop="shopInfo"/>
         <!-- 商家详情信息 -->
         <detail-detail-info :detailInfo="detailInfo" @imgLoad="imgLoad"/>
         <!-- 商品参数信息 -->
         <detail-params-info ref="params" :paramsInfo="paramsInfo"/>
         <!-- 商品评论信息 -->
         <detail-comment-info ref="comment" :commentInfo="commentInfo"/>
         <!-- 商品推荐信息 -->
         <goods-list ref="recommend" :goods="recommendInfo"/>
    </scroll>
    <!-- 返回顶部 -->
    <back-top @click.native="topclick" v-show="isshow"/>
    <!-- 底部购物车 -->
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
// 导入公共子组件
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'


//  导入子组件
import DetailNavBar from './childcomps/DetailNavBar'
import DetailBanner from './childcomps/DetailBanner'
import DetailBaseInfo from './childcomps/DetailBaseInfo'
import DetailShopInfo from './childcomps/DetailShopInfo'
import DetailDetailInfo from './childcomps/DetailDetailInfo'
import DetailParamsInfo from './childcomps/DetailParamsInfo'
import DetailCommentInfo from './childcomps/DetailCommentInfo'
import DetailBottomBar from './childcomps/DetailBottomBar'

// 导入方法
import { getDetail, getRecommend,GoodsInfo,Shop,GoodsParams } from 'network/detail'
 import {itemImgListenerMixin} from 'common/mixin'
 import {debounce} from 'common/utils'

export default {
    name:"Detail",
    components:{
        Scroll,
        GoodsList,
        BackTop,
        
        DetailNavBar,
        DetailBanner,
        DetailBaseInfo,
        DetailShopInfo,
        DetailDetailInfo,
        DetailParamsInfo,
        DetailCommentInfo,
        DetailBottomBar,
    },
    mixins:[itemImgListenerMixin],
    data(){
        return{
            iid:null,
            topImages:[],
            goodsInfo:{},
            shopInfo:{},
            detailInfo:{},
            paramsInfo:{},
            commentInfo:{},
            recommendInfo:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentindex:0,
            isshow:false,

        }
    },
    created(){
        this.iid=this.$route.params.iid
        
        // 根据iid请求详情数据
        getDetail(this.iid).then(res=>{
            console.log(res);
            const data=res.result
            // 获取轮播图信息
            this.topImages=data.itemInfo.topImages
            // 获取商品信息
            this.goodsInfo=new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
            // console.log(this.goodsInfo);
            //获取商家信息
            this.shopInfo=new Shop(data.shopInfo) 
            // console.log(this.shopInfo);
            // 获取商品详情数据
            this.detailInfo=data.detailInfo
            // 获取商品参数信息
            this.paramsInfo=new GoodsParams(data.itemParams.info,data.itemParams.rule)
            // console.log(this.paramsInfo);
            // 获取商品评论信息
            this.commentInfo=data.rate.list[0]
            // console.log(this.commentInfo);
            
        })
        // 请求推荐数据,这里的接口地址里只给了24条固定数据
        getRecommend().then((res)=>{
            console.log(res);
            // 保存推荐数据
            this.recommendInfo=res.data.list
            // console.log(this.recommendInfo);    
        })

        // 给getThemeTopY赋值防抖函数
        this.getThemeTopY=debounce(()=>{
             // 保存themeTopYs里的每一个元素的offSetTop值
             this.themeTopYs=[]
            this.themeTopYs.push(0)
            this.themeTopYs.push(this.$refs.params.$el.offsetTop)
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
            this.themeTopYs.push(Number.MAX_VALUE)
            // console.log('获取到高度了');  
        },10)
    },
     mounted(){
      // 用全局事件bus监听imgload事件，已被封装到混入方法中
     },
    destroyed(){
        // 取消itemimgload的全局事件的监听
        this.$bus.$off('itemimgload',this.itemImgListener)
    },
    methods:{
        imgLoad(){
            // 图片加载完成刷新一次，重新计算滚动高度
            this.$refs.scroll.refresh()
            // 调用保存滚动高度函数
            this.getThemeTopY()       
        },
        // 监听详情页导航点击，联动到当前的滚动位置
        titleClick(index){
            this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],200)
            console.log(this.themeTopYs);
             
        },
        // 监听scroll滚动位置，当滚动到某一区域时，让对应的导航标题显示高亮
        contentScroll(position){
            const positionY=-position.y
            for(let i=0;i<this.themeTopYs.length-1;i++){
                if(this.currentindex!=i&&positionY>=this.themeTopYs[i]&&positionY<=this.themeTopYs[i+1]){
                   this.currentindex=i
                //    console.log(this.currentindex);
                   this.$refs.detailNavBar.currentindex=this.currentindex
                }
            }
            this.isshow=positionY>1000
        },
         topclick(){
        // 拿到scroll组件里的scroll对象里的scrollTo方法
        this.$refs.scroll.scroll.scrollTo(0,0,500)
      },
        // 加入购物车
        addToCart(){
            //获取购物车需要展示的商品信息
            const product={}
            product.img=this.topImages[0]
            product.title=this.goodsInfo.title
            product.desc=this.goodsInfo.desc           
            product.price=this.goodsInfo.realPrice
            product.iid=this.iid
            // console.log(product);
            // 提交到mutations修改状态
            this.$store.dispatch('addCart',product)
        }
    }

}
</script>

<style scoped>
#detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
.content{
     position: absolute;
   top: 43px;
   bottom: 49px;
   overflow: hidden;
}
</style>