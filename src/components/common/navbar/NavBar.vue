<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name:'NavBar'
  }
</script>

<style >
 .nav-bar{
   display: flex;
   height: 44px;
   text-align: center;
   line-height: 44px;
   box-sizing: border-box;
   border-bottom: 1px solid lightgray;
   
 }
 .right{
   width: 60px;
   /* background-color: skyblue; */
 }
 .left{
   width: 60px;
   /* background-color: yellow; */
 } 
 .center{
   flex: 1;
   /* background-color: pink; */
 }
</style>
