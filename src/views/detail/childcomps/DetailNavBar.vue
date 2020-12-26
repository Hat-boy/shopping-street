<template>
  <div>
       <nav-bar>
           <div slot="left" class="back" @click="backclick">
               <img src="~assets/img/common/back.svg" alt="">
           </div>
          <div slot="center" class="title">
              <div v-for="(item,index) in titles" :key="index" class="itemtitle"
              :class="{active:index==currentindex}"
              @click="titleclick(index)">
                  {{item}}
              </div>
          </div>
      </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
    name:'DetailNavBar',
    components:{
        NavBar,
    },
    data(){
        return{
            titles:['商品','参数','评论','推荐'],
            currentindex:0,
        }
    },
    methods:{
        titleclick(index){
            this.currentindex=index
            this.$emit('titleClick',index)
        },
        backclick(){
            this.$router.back()
        }
    },

}
</script>

<style>
.active{
    color: var(--color-high-text);
}
.title{
    display: flex;
    font-size: 14px;
}
.itemtitle{
    flex: 1;
}
.back img{
    margin-top: 11px;
}
</style>