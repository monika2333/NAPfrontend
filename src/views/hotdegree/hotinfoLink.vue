<template>
    <div ref="container" style="width: 100%; height: 100%" >
        <el-table :data="hotlinkData" :border="true" style="width: 100%" empty-text="先选择话题后查看">
            <el-table-column prop="source" name="source" label="平台" width="180" />
            <el-table-column prop="link" label="链接" />
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    props: ['hotlinkData'],
    mounted() {
        
    }
}
</script>

<style scoped>

</style>