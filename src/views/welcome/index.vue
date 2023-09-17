<template>
  <div>
    <div>
      <span class="areaTitle">平台榜单</span>
      <el-row :gutter="18" style="margin-top: 8px;">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="scVue">
            <scrollVue :source="'知乎'" :column="['热榜','热搜']"/>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="scVue">
            <scrollVue :source="'百度'" :column="['实时热点']"/>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="scVue">
            <scrollVue :source="'今日头条'" :column="['头条热榜','热文周榜']"/>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <div class="scVue">
            <scrollVue :source="'新京报'" :column="['排行']"/>
          </div>
        </el-col>
      </el-row>
    </div>
    <div style="margin-top: 10px">
      <span class="areaTitle">数据概况</span>
      <el-row :gutter="18" style="margin-top: 8px;">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="scVue">
            <pic1Vue></pic1Vue>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="scVue">
            <pic2Vue></pic2Vue>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import pic1Vue from './pic1.vue'
import pic2Vue from './pic2.vue'
import scrollVue from './scroll.vue'

export default {
  components:{
    scrollVue,pic1Vue,pic2Vue
  }
}
</script>

<style scoped>
.areaTitle{
  font-size: 18px;
  font-weight: bold;
}
.scVue{
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 450px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 13px 0px rgba(122, 147, 153, 0.24);
}
</style>