<template>
  <div>
    <div class="add-and-search">
      <el-button type="primary" circle class="button" @click="showAddSidebar">
        <el-icon :size="20"><Plus /></el-icon>
      </el-button>
      <el-input
        v-model="keyword"
        :prefix-icon="Search"
        placeholder="请输入查询推特用户"
        clearable
        class="search"/>
    </div>
    <div class="mediaCard">

    </div>
    <el-row :gutter="25">
      <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6" v-for="d in tableDataFilter" :key="d.rssLink">
        <UserCard style="margin-bottom: 30px;" @getCardInfo="getCardInfo" :userData="d" :submitClose="submitClose" :openUpdateDrawer="openUpdateDrawer"></UserCard>
      </el-col>
    </el-row>

    <el-drawer
      ref="drawer"
      v-model="drawer"
      direction="ltr"
      size="50%"
      :before-close="handleClose">
      <AddUser ref="add" :submitClose="submitClose"></AddUser>
    </el-drawer>
    <el-drawer
      ref="drawer2"
      v-model="drawer2"
      direction="ltr"
      size="50%"
      :before-close="handleClose2">
      <UpdateUser ref="update" :dataNeedUpdate="dataNeedUpdate" :submitClose2="submitClose2"></UpdateUser>
    </el-drawer>
  </div>
</template>

<script>
import { getUserList } from "@/api/user";
import { ElMessageBox } from 'element-plus'
import UserCard from './userCard.vue';
import AddUser from './addUser.vue';
import UpdateUser from './updateUser.vue';

export default {
  data() {
    return {
      tableData: [],
      keyword: '',
      drawer: false,
      drawer2:false,
      dataNeedUpdate: {},
    };
  },
  components:{
    UserCard,
    AddUser,
    UpdateUser,
  },
  mounted() {
      getUserList().then(res => {
      this.tableData = res.data
    })
  },
  computed:{
    tableDataFilter(){
      return this.tableData.filter(
        (item) => {
          if(this.keyword === '')
          {
            return item
          }
          else
          {
            return item.author.includes(this.keyword)
          }
        }
      )
    }
  },
  methods:{
    showAddSidebar(){
      this.drawer = true
    },
    handleClose(){
      ElMessageBox.confirm('确定要关闭吗？（你将失去所填内容）')
        .then(() => {
          this.$refs.drawer.close()
          this.$refs.add.media.name = ''
          this.$refs.add.media.rssLink = ''
        })
        .catch(() => {

        })
    },
    submitClose(){
      console.log('yes')
      getUserList().then(res => {
        this.tableData = res.data
      })
      this.$refs.drawer.close()
      this.$refs.add.user.author = ''
      this.$refs.add.user.rssLink = ''
    },
    handleClose2(){
      ElMessageBox.confirm('确定要关闭吗？（你将失去所填内容）')
        .then(() => {
          this.$refs.drawer2.close()
        })
        .catch(() => {})
    },
    submitClose2(){
        getUserList().then(res => {
        this.tableData = res.data
      })
      this.$refs.drawer2.close()
    },
    openUpdateDrawer(){
      this.drawer2 = true
    },
    getCardInfo(data){
      this.dataNeedUpdate = data
      // console.log(this.dataNeedUpdate)
    }
  }
}
</script>

<script setup>
import {Plus,Search} from '@element-plus/icons-vue'
</script>

<style scoped>
.add-and-search{
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
}
.button{
  width: 50px;
  height: 50px;
}
.search{
  width: 500px;
  height: 55px;
}
:deep(.el-input__wrapper){
  border-radius: 30px;
}
:deep(.el-input-group__prepend){
  border-radius: 30px;
}
:deep(.el-input-number__increase){
  border-radius: 30px;
}
:deep(.el-input-number__decrease){
  border-radius: 30px;
}
</style>
