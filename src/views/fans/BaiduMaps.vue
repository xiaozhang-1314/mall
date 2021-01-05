<template>
<div class="bmap" id="container">

</div>
</template>

<script>
export default {
    name: 'BaiduMaps',
   mounted () {
       var map = new window.BMapGL.Map('container');
      
   }
}
</script>

<style scoped>
.bmap {
    width: 800px;
    height: 600px;
    border: 1px solid #000
}
</style>