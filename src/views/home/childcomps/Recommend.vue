<template>
  <div class="recommend">
      <div v-for="item in recommends" :key="item.id" class="recommend-item">
          <a href="javascript:;">
              <img :src="item.image" alt="">
              <div>{{item.title}}</div>
          </a>
      </div>
  </div>
</template>

<script>
export default {
    name:'Recommend',
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style>
.recommend{
    display: flex;
    width:100%;
    text-align: center;
    border-bottom: 10px solid rgba(247, 245, 245, 0.966);
    padding: 10px 0 20px;
     
}
.recommend-item{
    flex: 1;
   
}
.recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
}
</style>