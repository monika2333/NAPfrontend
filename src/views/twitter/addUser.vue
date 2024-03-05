<template>
  <el-form
    :model="user"
    label-width="120px"
    ref="ruleFormRef"
    v-loading="loading"
    element-loading-text="新增中......"
    element-loading-background="rgba(200, 200, 200, 0.8)">
    <el-form-item label="推特用户" required error>
      <el-input v-model="user.author" style="width: 500px;"/>
    </el-form-item>
    <el-form-item label="rss链接" required error>
      <el-input v-model="user.rssLink" style="width: 500px;">
        <template #prepend>http://127.0.0.1:6666/twitter/user/</template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {addTwitterUser} from '@/api/user'
export default {
  data() {
    return {
      user: {
        author: '',
        rssLink: '',
      },
      loading: false,
    }
  },
  props: ['submitClose'],
  methods: {
    onSubmit() {
      if (this.user.author === '' || this.user.rssLink === '')
      {
        alert('必填项不能为空')
      }
      else
      {
        this.loading = true
        this.user.rssLink = 'http://127.0.0.1:6666/' + this.user.rssLink
        addTwitterUser(this.user).then(res=>{
          this.user.name = ''
          this.user.rssLink = ''
          this.loading = false
          if(res.code === 0)
          {
            alert('添加成功')
            this.submitClose()
          }
          else
          {
            alert('添加失败')
          }
        })
      }
    }
  },
  deactivated(){
    this.media.name = ''
    this.media.rssLink = ''
  }
}
</script>

<style scoped>

</style>
