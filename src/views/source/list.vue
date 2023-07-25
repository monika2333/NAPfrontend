<template>
    <div>
        <div style="margin-top: 30px">
            <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column prop="name" label="名称"> </el-table-column>
            <el-table-column prop="column" label="频道"> </el-table-column>
            <el-table-column prop="rssLink" label="链接"> </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import { getMediaList } from "@/api/user";
export default {
    data() {
        return {
            tableData: [],
        };
    },
    mounted() {
        getMediaList().then(res => {
            this.tableData = res
        })
    },
}
</script>

<style>

</style>