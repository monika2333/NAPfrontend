<template>
    <div>
        <el-row :gutter="18">
            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <div class="hotinfo_list">
                    <div class="scroll_title">
                        <h3>聚合热榜</h3>
                    </div>
                    <ul class="scroll">
                        <el-scrollbar>
                            <li class="item" v-for="(item, index) in topTopics" :key="index" @click="changeInfo(item.rank, item.title)">
                                <span class="rank">{{ item.rank }}</span>
                                <span class="title">{{ item.title }}</span>
                                <span class="degree">{{ item.hotdegree }}</span>
                            </li>
                        </el-scrollbar>
                    </ul>
                    <div class="scroll_time">
                        <span>更新时间：{{ updateTime }}</span>
                    </div>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                <div class="hotdegree_line">
                    <hotdegreeLine :hotlineData="hotline" :hotTitle="hotTitle"></hotdegreeLine>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="18" style="margin-top: 10px;">
            <div class="hotinfo_info">
                <el-tabs v-model="activeName" class="tabs" @tab-click="handleClick">
                    <el-tab-pane label="热门链接" name="link" style="width: 100%;height: 450px;">
                        <hotinfoLink :hotlinkData="hotlink"/>
                    </el-tab-pane>
                    <el-tab-pane label="其他" name="else">其他</el-tab-pane>
                </el-tabs>
            </div>
        </el-row>
    </div>
</template>

<script setup>
import {Plus} from '@element-plus/icons-vue';
</script>

<script>
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import hotdegreeLine from './hotdegreeLine.vue';
import { getTop50, gethotline, gethotlink } from "@/api/user";
import hotinfoLink from './hotinfoLink.vue';

export default {
    data(){
        return{
            updateTime: "",
            activeName: 'link',
            topTopics: [],
            hotline: [],
            hotlink: [],
            hotTitle: '',
        }
    },
    components: {
        Vue3SeamlessScroll, hotdegreeLine, hotinfoLink
    },
    mounted(){
        getTop50().then(res => {
            this.updateTime = res.data.updatetime
            this.topTopics = res.data.top
        })
    },
    methods:{
        changeInfo(rank, title){
            this.changeLine(rank, title)
            this.changeLink(rank)
        },
        changeLine(rank, title){
            this.hotTitle = title
            gethotline({rank: rank}).then(res =>{
                // console.log(res.data)
                this.hotline = res.data
            })
        },
        changeLink(rank){
            gethotlink({rank: rank}).then(res =>{
                console.log(res.data)
                this.hotlink = res.data
            })
        }
    }
}
</script>

<style scoped>
.hotinfo_list{
    width: 100%;
    height: 500px;
    border-radius: 20px;
    box-shadow: 0px 2px 13px 0px rgba(122, 147, 153, 0.24);
}
.hotdegree_line{
    width: 100%;
    height: 500px;
    border-radius: 20px;
    box-shadow: 0px 2px 13px 0px rgba(122, 147, 153, 0.24);
}
.hotinfo_info{
    width: 100%;
    height: 500px;
    border-radius: 20px;
    box-shadow: 0px 2px 13px 0px rgba(122, 147, 153, 0.24);
    padding: 15px 30px;
}
.scroll_title{
    width: 100%;
    height: 40px;
    text-align: center;
    line-height: 40px;
}
.scroll{
    width: 100%;
    height: 430px;
}
.scroll_time{
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: 13px;
    color: rgb(108, 108, 108);
}
.scroll .item {
    width: 100%;
    margin-top: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.rank{
    width: 10%;
    margin: 5px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
}
.title{
    width: 70%;
    margin: 5px;
    font-size: 13px;
}
.degree{
    width: 20%;
    color: rgb(100, 100, 100);
    display: flex;
    justify-content: center;
    font-size: 13px;
}
</style>