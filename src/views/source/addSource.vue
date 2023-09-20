<template>
    <el-form :model="media" label-width="120px" ref="ruleFormRef">
      <el-form-item label="媒体名称" required error>
        <el-input v-model="media.name" style="width: 500px;"/>
      </el-form-item>
      <el-form-item label="媒体类型">
        <el-radio-group v-model="media.type">
          <el-radio label="传统媒体" />
          <el-radio label="新媒体" />
          <el-radio label="其他" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="媒体网站">
        <el-input v-model="media.link" style="width: 500px;"/>
      </el-form-item>
      <el-form-item label="采集频道">
        <el-input v-model="media.column" style="width: 500px;"/>
      </el-form-item>
      <el-form-item label="语言">
        <el-radio-group v-model="media.language">
          <el-radio label="中文" />
          <el-radio label="繁体中文" />
          <el-radio label="英语" />
          <el-radio label="日语" />
          <el-radio label="未知" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="rss链接类型">
        <el-radio-group v-model="rsstype">
          <el-radio label="rsshub路由" />
          <el-radio label="外部网站" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="rss链接" required error>
        <el-input v-model="media.rssLink" style="width: 500px;">
          <template #prepend v-if="rsstype == 'rsshub路由'">http://127.0.0.1:1200/</template>
        </el-input>
      </el-form-item>
      <el-form-item label="采集标签信息（请先确定rss中有该字段）" label-width="300px">
        <el-radio-group v-model="media.needTag">
          <el-radio label="是" />
          <el-radio label="否" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="采集作者信息（请先确定rss中有该字段）" label-width="300px">
        <el-radio-group v-model="media.needAuthor">
          <el-radio label="是" />
          <el-radio label="否" />
        </el-radio-group>
      </el-form-item>
  
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script>
  import {checkRss, addSourceMedia} from '@/api/user'
  export default {
    data() {
      return {
        media: {
          name: '',
          type: '其他',
          link: '',
          column: '',
          language: '未知',
          rssLink: '',
          needTag: '否',
          needAuthor: '否',
          comment: '',
        },
        rsstype: 'rsshub路由',
      }
    },
    props: ['submitClose'],
    methods: {
      onSubmit() {
        if (this.media.name == '' || this.media.rssLink == '')
        {
          alert('必填项不能为空')
        }
        else
        {
          if(this.rsstype == 'rsshub路由')
          {
            this.media.rssLink = 'http://127.0.0.1:1200/' + this.media.rssLink
          }
          checkRss({rss: this.media.rssLink}).then(res=>{
            if(res.code==0)
            {
              addSourceMedia(this.media).then(res=>{
                if(res.code==0)
                {
                  alert('添加成功')
                  this.submitClose()
                }
                else
                {
                  alert('添加失败')
                }
                this.media.name = ''
                this.media.rssLink = ''
              })
            }
            else
            {
              alert('rss校验失败，请检查地址是否准确')
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