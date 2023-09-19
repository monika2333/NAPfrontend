<template>
    <div>
        <div class="message_title">
            <span class="title_text">订阅列表</span>
            <el-button type="primary" @click="showAddDia">添加订阅</el-button>
        </div>
        <el-table :data="tableData" :border="true" class="message_table">
            <el-table-column prop="address" label="地址" width="250"> </el-table-column>
            <el-table-column prop="keyword" label="关键词"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="200">
                <template #default="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogShow" title="添加订阅">
            <el-form :model="form">
                <el-form-item label="接收方式">
                    <el-radio-group v-model="form.type">
                        <el-radio label="私有微信" />
                        <el-radio label="邮箱" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="手机号（私有微信）/手机号">
                    <el-input v-model="form.name"/>
                </el-form-item>
                <el-form-item label="关键词（多个关键词使用英文逗号隔开）">
                    <el-input
                        v-model="form.keyword"
                        :autosize="{ minRows: 3, maxRows: 3 }"
                        type="textarea"
                        resize="none"
                    />
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">
                Confirm
                </el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dialogShow: false,
            tableData: [
                {
                    address: '12311112222',
                    keyword: ['1','234', 'china']
                }
            ],
            form : {
                type: '',
                name: '',
                keyword: '',
            }
        }
    },
    methods:{
        showAddDia(){
            this.dialogShow = true
        }
    }
}
</script>

<style scoped>
.message_title{
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content:space-between;
    flex-wrap: wrap;
}
.title_text{
    font-weight: bold;
    font-size: 20px;
}
.message_table{
    margin-top: 30px;
}
</style>