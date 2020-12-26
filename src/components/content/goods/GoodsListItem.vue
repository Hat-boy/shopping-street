<template>
  <div class="goods-list-item" @click="itemclick">
      <img :src="showImage" alt="" @load="imgload">
      <div class="description">
          <p class="title">{{goodsitem.title}}</p>
          <span class="price">{{goodsitem.price}}</span>
          <span class="cfav">{{goodsitem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
    name:'GoodsListItem',
    props:{
        goodsitem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        imgload(){
            // 向数据总线发射一个事件
            this.$bus.$emit('itemimgload')
        },
        itemclick(){
            // console.log('路由跳转');
            // query方法
            // this.$router.push({
            //         path:'detail',
            //         query:{
            //             iid:this.goodsitem.iid
            //         }
            //    })
            this.$router.push({
                name:'detail',
                params:{
                    iid:this.goodsitem.iid
                }
            })
            // 总结：query用path引用，path用name引用，且要设置name和动态路由
        },
    },

    // 计算属性，注：标签里绑定计算函数不需要加括号
    computed:{
        showImage(){
            return this.goodsitem.image||this.goodsitem.show.img
        }
    }
}
</script>

<style scoped>
.goods-list-item{
    margin-bottom: 5px;
}
.goods-list-item img{
    width: 100%;
    border-radius: 8px;
    /* margin-bottom: 10px; */
}
.description{
    text-align: center;
    
}
.title{
    overflow: hidden;
     text-overflow: ellipsis;
     display: -webkit-box;
     -webkit-line-clamp: 1;
     -webkit-box-orient: vertical;
     margin: 5px; 
}
.price{
    color: var(--color-tint);
}
.cfav{
    position: relative;
    padding-left: 15px;
    margin-left: 10px;
}
.cfav::before{
    content:'';
    position: absolute;
    left: 1px;
    top: 1px;
    height: 15px;
    width: 15px;
    background-color: blue;
    background: url('~assets/img/common/collect.svg') no-repeat;
    background-size: 14px 14px;
}
</style>