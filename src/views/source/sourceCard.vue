<template>
    <el-card class="box-card">
        <div class="head">
            <span class="headName">媒体名称</span>
            <span class="headItem one-row">{{ mediaData.mediaName }}</span>
            <span class="headName">订阅频道</span>
            <span class="headItem one-row">{{ mediaData.column }}</span>
            <span class="headName">订阅链接</span>
            <span class="headItem">{{ mediaData.rssLink }}</span>
        </div>
        <div class="split">
            <el-button type="success" circle class="button">
                <el-icon :size="20"><EditPen /></el-icon>
            </el-button>
            <el-button ref="buttonDelete" type="danger" circle class="button" @click="handleDelete">
                <el-icon :size="20"><Delete /></el-icon>
            </el-button>
        </div>
        <div class="foot">
            <div class="footblock">
                <span style="font-size: 20px; font-weight: bold; color: rgb(134, 134, 134);">创建时间</span>
                <span style="font-weight: lighter; color: rgb(77, 77, 77);">{{mediaData.addTime}}</span>
            </div>
            <div class="footblock">
                <span style="font-size: 20px; font-weight: bold; color: rgb(134, 134, 134);">使用语言</span>
                <span style="font-weight: lighter; color: rgb(77, 77, 77);">{{mediaData.language}}</span>
            </div>
        </div>
    </el-card>
</template>

<script>
import {delSourceMedia} from '@/api/user'
import { ElMessageBox } from 'element-plus'

export default {
    data() {
        return{

        }
    },
    props: ['mediaData', 'submitClose'],
    mounted(){
        
    },
    methods:{
        handleDelete(){
            if(this.mediaData.addTime == '2023.07.25')
            {
                alert('不可删除')
            }
            else
            {
                ElMessageBox.confirm('确定删除吗？（此操作不可逆）')
                .then(()=>{
                    delSourceMedia({rssLink: this.mediaData.rssLink}).then(
                    res => {
                        if(res.code==0)
                        {
                            alert('删除成功')
                            this.submitClose()
                        }
                        else
                        {
                            alert('删除失败')
                        }
                    }
                )
                .catch(() => {})
                })
            }
        }
    }
}
</script>

<script setup>
import {EditPen, Delete} from '@element-plus/icons-vue'
</script>

<style scoped>
.el-card ::v-deep .el-card__body {
  padding: 0px;
}
.box-card {
    width: 100%;
    height: 400px;
    padding: 0px;
    font-family:"Microsoft YaHei";
    background-color: rgb(237, 253, 253);
    background-image: url('./assets/bk.png');
    background-size:100% 100%;
    border-radius: 35px;
    box-shadow: 15px 15px 20px -10px rgba(0,0,0,0.2),
                inset 20px 20px 15px rgba(255,255,255,0.7),
                -15px -15px 35px rgba(255,255,255,0.7),
                inset -1px 1px 10px rgba(0,0,0,0.5);
}
.button{
    width: 50px;
    height: 50px;
}
.head{
    height: 220px;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    gap: 5px;
    padding-left: 10px;
    padding-right: 10px;
}
.headName{
    font-size: 13px;
    color: rgb(77, 77, 77);
}
.one-row{
    max-width: 10em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.headItem{
    font-size: 15px;
    font-weight: bolder;
    color: rgb(134, 134, 134);
}
.split{
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 50px;
}
.foot{
    height: 130px;
    display: flex;
    justify-content: center;
    gap: 15px;
}
.footblock{
    width: 40%;
    height: 70%;
    display: flex;
    flex-direction:column;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    gap: 10px;
}
span{
    display: inline-block;
    word-break: break-all;
    text-align:center;
}
</style>