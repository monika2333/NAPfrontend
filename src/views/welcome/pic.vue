<template>
  <div style="width: 35vw; height: 400px;">
    <pic1Vue></pic1Vue>
  </div>
  <div style="width: 35vw; height: 400px;">
    <pic2Vue></pic2Vue>
  </div>
</template>

<script>
import pic1Vue from './pic1.vue';
import pic2Vue from './pic2.vue';
export default {
  data() {
    return {
      
    };
  },
  components: {
    pic1Vue,
    pic2Vue
  }
}
</script>

<style scoped>

</style>