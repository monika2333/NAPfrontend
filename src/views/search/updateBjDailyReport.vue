<template>
  <el-form
      :model="bjDailyReport"
      label-width="120px"
      ref="ruleFormRef"
      v-loading="loading"
      element-loading-text="更新中......"
      element-loading-background="rgba(200, 200, 200, 0.8)">
    <el-form-item label="上报内容类型" required error>
      <el-input v-model="bjDailyUpdateReport.type" style="width: 500px;"/>
    </el-form-item>
    <el-form-item label="上报期数">
      <el-input v-model="bjDailyUpdateReport.number" style="width: 500px;"/>
    </el-form-item>
    <el-form-item label="上报日期" required error>
      <el-input v-model="bjDailyUpdateReport.report_date"  style="width: 500px;"/>
    </el-form-item>
    <el-form-item label="标题" required error>
      <el-input v-model="bjDailyUpdateReport.title"  style="width: 500px;"/>
    </el-form-item>
    <el-form-item label="内容">
      <el-input
          v-model="bjDailyUpdateReport.content"
          maxlength="500"
          placeholder="Please input"
          show-word-limit
          type="textarea"
          style="width: 500px;"
      />
    </el-form-item>
    <el-form-item label="上报来源或链接" required error>
      <el-input v-model="bjDailyUpdateReport.source_or_url"  style="width: 500px;"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onUpdateSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {deleteBjDailyReport, updateBjDailyReport,} from '@/api/user'
import { ref, reactive, watchEffect, toRefs } from "vue";
export default {
  data() {
    return {
      // bjDailyUpdateReport: {
      //   id: '',
      //   type: '',
      //   number: '',
      //   report_date: '',
      //   title: '',
      //   content: '',
      //   source_or_url: ''
      // },
      loading: false,
    }
  },
  props: ['bjDailyUpdateReport','submitClose'],
  methods: {
    onUpdateSubmit() {
      if (this.bjDailyUpdateReport.content === '')
      {
        alert('必填项不能为空')
      }
      else
      {
        this.loading = true
        updateBjDailyReport(this.bjDailyUpdateReport).then(res=>{
          console.log(res)
          if(res.code === 0)
          {
            alert('更新成功')
            this.loading = false
            this.submitClose()
          }
          else
          {
            alert('更新失败')
          }
        })
      }
    }
  },
  // setup(props) {
  //   console.log(props.bjDailyUpdateReport)
  //   // const state = reactive({ bjDailyUpdateReport:{}});
  //   watchEffect(() => {
  //     // state.bjDailyUpdateReport = props.bjDailyUpdateReport;
  //   });
  //   // return { ...toRefs(state) };
  // },
  deactivated(){
    this.bjDailyUpdateReport.content = ''
  }
}
</script>

<style scoped>

</style>
