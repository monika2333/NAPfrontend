<template>
  <el-form
    :model="bjDaily"
    label-width="120px"
    ref="ruleFormRef"
    v-loading="loading"
    element-loading-text="新增中......"
    element-loading-background="rgba(200, 200, 200, 0.8)">
    <el-form-item label="新闻标题" required error>
      <el-input v-model="bjDaily.title" style="width: 500px;"/>
    </el-form-item>
    <el-form-item label="新闻内容">
      <el-input
        v-model="bjDaily.content"
        maxlength="500"
        placeholder="Please input"
        show-word-limit
        type="textarea"
        style="width: 500px;"
      />
    </el-form-item>
    <el-form-item label="新闻链接">
      <el-input v-model="bjDaily.url" style="width: 500px;"/>
    </el-form-item>
    <el-form-item label="浏览量" required error>
      <el-input-number v-model="bjDaily.views_count" :min="0" />
    </el-form-item>
    <el-form-item label="情感分析" required error>
        <el-select v-model="bjDaily.sentiment" clearable placeholder="请选择" >
          <el-option
            v-for="item in sentimentType"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          />
        </el-select>
    </el-form-item>
    <el-form-item label="发布平台">
      <el-input v-model="bjDaily.platform" style="width: 500px;"/>
    </el-form-item>
    <el-form-item label="发布时间(e.g. 2024/01/12 19:36)">
      <el-input v-model="bjDaily.publish_time" style="width: 500px;"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {addBjDaily, } from '@/api/user'
export default {
  data() {
    return {
      bjDaily: {
        title: '',
        content: '',
        url: '',
        views_count: '',
        sentiment: '',
        platform: '',
        publish_time: ''
      },
      sentimentType: [
        {
          "key": 0,
          "value": "中性"
        },
        {
          "key": 2,
          "value": "确定正面"
        },
        {
          "key": 1,
          "value": "疑似正面"
        },
        {
          "key": -6,
          "value": "确定负面(高敏感)"
        },
        {
          "key": -5,
          "value": "确定负面(敏感)"
        },
        {
          "key": -2,
          "value": "确定负面"
        },
        {
          "key": -1,
          "value": "疑似负面"
        },
        {
          "key": 9,
          "value": "争议"
        }
      ],
      loading: false,
    }
  },
  props: ['submitClose'],
  methods: {
    onSubmit() {
      if (this.bjDaily.title == '' || this.bjDaily.url == '')
      {
        alert('必填项不能为空')
      }
      else
      {
        this.loading = true
        console.log(this.bjDaily)
        addBjDaily(this.bjDaily).then(res=>{
          if(res.code==0)
          {
            alert('添加成功')
            this.loading = false
            this.submitClose()
          }
          else
          {
            alert('添加失败')
            this.loading = false
          }
        })
      }
    }
  },
  deactivated(){
    this.bjDaily.name = ''
    this.bjDaily.rssLink = ''
  }
}
</script>

<style scoped>

</style>
