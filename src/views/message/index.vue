<template>
    <div>
        <div class="message_title">
            <span>订阅列表</span>
            <el-button type="primary">添加订阅</el-button>
        </div>
        <el-table :data="tableData" :border="true">
            <el-table-column prop="address" label="地址" width="250"> </el-table-column>
            <el-table-column prop="keyword" label="关键词"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template #default="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data(){
        return{
            tableData: [
                {
                    address: '12311112222',
                    keyword: ['1','234', 'china']
                }
            ]
        }
    }
}
</script>

<style scoped>

</style>