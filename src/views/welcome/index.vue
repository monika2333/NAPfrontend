<template>
  <div>
    <el-dropdown @command="addMedia">
      <span class="el-dropdown-link"
        >平台榜单
        <!--      <el-icon class="el-icon&#45;&#45;right"><arrow-down /></el-icon>-->
      </span>
      <template #dropdown>
        <el-dropdown-menu >
          <el-dropdown-item @click="dropdownMe('zh')">知乎</el-dropdown-item>
          <el-dropdown-item @click="dropdownMe('bd')">百度</el-dropdown-item>
          <el-dropdown-item @click="dropdownMe('jrtt')"
            >今日头条</el-dropdown-item
          >
          <el-dropdown-item @click="dropdownMe('xjb')">新京报</el-dropdown-item>
          <el-dropdown-item @click="dropdownMe('wb')">微博</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="scVue" v-if="dropdownMeVisabled == 'zh'">
      <scrollVue :source="'知乎'" :column="['热榜', '热搜']" />
    </div>
    <div class="scVue" v-if="dropdownMeVisabled == 'bd'">
      <scrollVue :source="'百度'" :column="['实时热点']" />
    </div>
    <div class="scVue" v-if="dropdownMeVisabled == 'jrtt'">
      <scrollVue :source="'今日头条'" :column="['头条热榜', '热文周榜']" />
    </div>
    <div class="scVue" v-if="dropdownMeVisabled == 'xjb'">
      <scrollVue :source="'新京报'" :column="['排行']" />
    </div>
    <div class="scVue" v-if="dropdownMeVisabled == 'wb'">
      <scrollVue :source="'微博'" :column="['排行']" />
    </div>
  </div>
  <div>
    <div style="margin-top: 10px">
      <span class="dataProfiling">数据概况</span>
      <el-row :gutter="18" style="margin-top: 8px">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="scVue">
            <pic1Vue />
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <div class="scVue">
            <pic2Vue />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import pic1Vue from "./pic1.vue";
import pic2Vue from "./pic2.vue";
import scrollVue from "./scroll.vue";
export default {
  data() {
    return {
      // dialogShow1: false,
      // dialogShow2: false,
      dropdownMeVisabled: "zh"
    };
  },
  components: {
    scrollVue,
    pic1Vue,
    pic2Vue
  },
  methods: {
    dropdownMe(value){
      console.log(value)
      this.dropdownMeVisabled = value
    }
  }
};

// const handleCommand = (command: string | number | object) => {
//   ElMessage(`click on item ${command}`)
// }
</script>

<style scoped>
.scVue {
  display: flex;
  justify-content: center;
  background-color: rgb(255, 255, 255);
  width: 100%;
  height: 450px;
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 2px 13px 0px rgba(122, 147, 153, 0.24);
}
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
  display: block;
  font-size: 18px;
  font-weight: bold;
  margin-left: 12px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.dataProfiling {
  display: flex;
  align-items: center;
  display: block;
  font-size: 18px;
  font-weight: bold;
  margin-left: 12px;
  color: #555a64;
}
</style>
