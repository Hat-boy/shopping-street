<template>
  <div class="check-button" :class="{active:isChecked}" >
      <img src="~/assets/img/cart/tick.svg" alt=""> 
  </div>
</template>

<script>
export default {
    name:'CheckButton',
    props:{
        isChecked:{
            type:Boolean,
            default:false
        }
    },
}
</script>

<style scoped>
.check-button{
    position: relative;
    margin: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid #ccc;
    cursor: pointer;
    
}
.active{
    background-color: #ff8198;
    border-color: #ff8198;
}
</style>