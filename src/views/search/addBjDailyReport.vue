<template>
  <el-form
    :model="bjDaily"
    label-width="120px"
    ref="ruleFormRef"
    v-loading="loading"
    element-loading-text="新增中......"
    element-loading-background="rgba(200, 200, 200, 0.8)">
    <el-form-item label="新增内容">
      <el-input
        v-model="bjDailyReport.content"
        maxlength="3000"
        placeholder="Please input"
        :rows="25"
        show-word-limit
        type="textarea"
        style="width: 1000px;"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {addBjDailyReport,} from '@/api/user'
export default {
  data() {
    return {
      bjDailyReport: {
        content: '',
      },
      loading: false,
    }
  },
  props: ['submitClose'],
  methods: {
    onSubmit() {
      if (this.bjDailyReport.content == '')
      {
        alert('必填项不能为空')
      }
      else
      {
        this.loading = true
        console.log(this.bjDailyReport)
        addBjDailyReport(this.bjDailyReport).then(res=>{
          if(res.code==0)
          {
            alert('添加成功')
            this.submitClose()
          }
          else
          {
            alert('添加失败')
          }
          this.bjDaily.content = ''
          this.loading = false
        })
      }
    }
  },
  deactivated(){
    this.bjDaily.content = ''
  }
}
</script>

<style scoped>

</style>
