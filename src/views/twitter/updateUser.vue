<template>
  <el-form :model="user" label-width="120px" ref="ruleFormRef">
    <el-form-item label="用户名称" required error>
      <el-input v-model="user.author" style="width: 500px;"/>
    </el-form-item>

    <el-form-item label="rss链接" required error>
      <el-input v-model="user.rssLink" style="width: 500px;"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {updateTwitterUser} from '@/api/user'

export default {
  data() {
    return {
      user: {
        _id: '',
        author: '',
        rssLink: ''
      },
    }
  },
  props: ['dataNeedUpdate', 'submitClose2'],
  mounted(){
    this.putDataIntoView()
  },
  watch:{
    dataNeedUpdate:{
      handler: function(){
        this.putDataIntoView()
      },
      deep: true,
    }
  },
  methods: {
    onSubmit() {
      if (this.user.name === '' || this.user.rssLink === '')
      {
        alert('必填项不能为空')
      }
      else
      {
        updateTwitterUser(this.user).then(res=>{
          if(res.code === 0)
          {
            alert('修改成功')
            this.submitClose2()
          }
          else
          {
            alert('修改失败')
          }
        })
      }
    },
    putDataIntoView(){
        console.log(this.dataNeedUpdate)
      this.user._id = this.dataNeedUpdate._id
      this.user.author = this.dataNeedUpdate.author
      this.user.rssLink = this.dataNeedUpdate.rssLink
      this.user.addTime = this.dataNeedUpdate.addTime
      this.user.updateTime = this.dataNeedUpdate.updateTime
    }
  },
}
</script>

<style scoped>

</style>
