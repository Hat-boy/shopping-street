<template>
  <div class="wrapper" ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'

export default {
    name:'Scroll',
    data(){
        return{
            scroll:null,
        }
    },
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{//上拉加载更多，默认为false
            type:Boolean,
            default:false,
        }
    },
    methods:{
        refresh(){
            // console.log('该函数被调用了');
            this.scroll.refresh()
        }
    },
    
    // 当元素挂载完成后。new一个BScroll
    mounted(){
        this.scroll=new BScroll(this.$refs.wrapper,{
            click:true,
            probeType:this.probeType,
            pullUpLoad:this.pullUpLoad
        })
        //实时监听移动位置
       if(this.probeType===2||this.probeType===3){
            this.scroll.on('scroll',position=>{
            // console.log(position);
            this.$emit('scroll',position)
        })
       }
        // 上拉加载更多
        if(this.pullUpLoad){//当页面滚动到底部再监听
            this.scroll.on('pullingUp',()=>{
            // console.log('上拉加载更多');
            this.$emit('pullingUp')
        })
        }
    }
}
</script>

<style>

</style>