<template>
    <div>
        <div class="add-and-search">
            <el-button type="primary" circle class="button" @click="showAddSidebar">
                <el-icon :size="20"><Plus /></el-icon>
            </el-button>
            <el-input 
                v-model="keyword"
                :prefix-icon="Search"
                placeholder="请输入查询媒体源"
                clearable
                class="search"/>
        </div>
        <div class="mediaCard">

        </div>
        <el-row :gutter="25">
            <el-col :xs="12" :sm="8" :md="8" :lg="6" :xl="6" v-for="d in tableDataFilter" :key="d.rssLink">
                <SourceCard style="margin-bottom: 30px;" :mediaData="d" :submitClose="submitClose"></SourceCard>
            </el-col>
        </el-row>

        <el-drawer
            ref="drawer"
            v-model="drawer"
            direction="ltr"
            size="50%"
            :before-close="handleClose">
            <AddSource ref="add" :submitClose="submitClose"></AddSource>
        </el-drawer>
    </div>
</template>

<script>
import { getMediaList } from "@/api/user";
import { ElMessageBox } from 'element-plus'
import SourceCard from './sourceCard.vue';
import AddSource from './addSource.vue';

export default {
    data() {
        return {
            tableData: [],
            keyword: '',
            drawer: false,
        };
    },
    components:{
        SourceCard,
        AddSource
    },
    mounted() {
        getMediaList().then(res => {
            this.tableData = res.data
        })
    },
    computed:{
        tableDataFilter(){
            return this.tableData.filter(
                (item) => {
                    if(this.keyword == '')
                    {
                        return item
                    }
                    else
                    {
                        return item.mediaName.includes(this.keyword)
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
            getMediaList().then(res => {
                this.tableData = res
            })
        },
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
</style>