<template>
  <div>
    <!--表头-->
    <div class="message_title">
      <span class="title_text">订阅列表</span>
      <el-button type="primary" @click="showAddDia">添加订阅</el-button>
    </div>
    <!--表-->
    <el-table :data="tableData" :border="true" class="message_table">
      <el-table-column label="账户信息">
        <template #default="scope">
          <div v-if="scope.row.phone">{{ scope.row.phone }}</div>
          <div v-else>{{ scope.row.email }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="source" label="订阅地址" />
      <el-table-column prop="keywords" label="关键词" />
      <el-table-column fixed="right" label="操作" width="300">
        <template #default="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--新增-->
    <el-dialog v-model="dialogShow" title="添加订阅">
      <el-form :model="form" label-width="80px">
        <el-form-item
          label="接收方式"
          :rules="{ required: true, message: '请选择接收方式' }"
        >
          <el-radio-group v-model="form.type">
            <el-radio :label="0">私有微信</el-radio>
            <el-radio :label="1">邮箱</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item ref="number" label="账号" v-if="form.type == 0">
          <el-input v-model="form.phone" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item ref="number" label="邮箱" v-if="form.type == 1">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item
          label="订阅地址"
          :rules="{ required: true, message: '请选择订阅地址' }"
        >
          <div class="m-4">
            <el-select
              v-model="selectedValue"
              multiple
              placeholder="请选择订阅地址"
              style="width: 400px"
            >
              <el-option
                v-for="item in sources"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <el-input
            v-model="form.source"
            :autosize="{ minRows: 1, maxRows: 3 }"
            type="textarea"
            resize="none"
            placeholder="请输入其他订阅源，并用英文','隔开"
            style="margin-top: 10px"
          />
        </el-form-item>
        <el-form-item ref="text" label="关键词">
          <el-input
            v-model="form.keyword"
            :autosize="{ minRows: 3, maxRows: 3 }"
            type="textarea"
            resize="none"
            placeholder="多个关键词请使用英文逗号隔开……"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="clear">重置</el-button>
          <el-button type="primary" @click="add()"> 提交发送 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { http } from "@/utils/http";
import { baseUrlApi } from "@/api/utils";
import { delMessage } from "@/api/user";
import { addMessage } from "@/api/user";
export default {
  data() {
    return {
      dialogShow: false,
      tableData: [],
      name: "",
      form: {
        type: 0,
        phone: "",
        email: "",
        keyword: "",
        source: ""
      },
      selectedValue: null,
      list: [], //列表信息
      value1: [],
      value2: [],
      value3: [],
      value4: [],
      sources: [
        {
          value: "Option1",
          label: "ABC News"
        },
        {
          value: "Option2",
          label: "AP News"
        },
        {
          value: "Option3",
          label: "BBC"
        },
        {
          value: "Option4",
          label: "CBC"
        },
        {
          value: "Option5",
          label: "CGTN"
        }
      ]
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    showAddDia() {
      this.dialogShow = true;
    },
    clear() {
      this.form = {};
    },
    //列表
    getList() {
      http
        .request<any>("get", baseUrlApi("messageSubscribe/list"))
        .then(res => {
          if (res.msg == "成功") {
            this.tableData = res.data;
          }
        });
    },
    add() {
      console.log(this.form);
      const param = {
        id: this.getuuid(),
        type: this.form.type,
        phone: this.form.phone ? this.form.phone : "",
        email: this.form.email ? this.form.email : "",
        keywords: this.form.keyword.split(","),
        source: this.form.source.split(",")
      };
      addMessage(param).then(res => {
        if (res.code == 0) {
          alert("添加成功");
          this.dialogShow = false;
          this.getList();
        } else {
          alert("添加失败");
        }
      });
    },
    handleClick(record) {
      //弹框询问用户是否删除数据
      this.$confirm("此操作将永久删除该条信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          delMessage({ id: record._id }).then(res => {
            if (res.code == 0) {
              alert("删除成功");
              this.dialogShow = false;
              this.getList();
            } else {
              alert("删除失败");
            }
          });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消删除" });
        });
    },

    getuuid() {
      //需要16位就把下方return的字符串改成想要的格式
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          const r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8;
          return v.toString();
        }
      );
    }
  }
};
</script>

<style scoped>
.message_title {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.title_text {
  font-weight: bold;
  font-size: 20px;
}
.message_table {
  margin-top: 30px;
}

.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
.m-4 {
  margin: 0px;
}
</style>
