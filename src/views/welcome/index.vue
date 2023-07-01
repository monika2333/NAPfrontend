<template>
  <div>
    <div style="display: flex; align-items: center">
      <div>
        <span>信息来源：</span>
        <el-select v-model="source" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </div>
      <div style="display: flex; align-items: center; margin-left: 30px;">
        <span>信息数量：</span>
        <el-slider v-model="nums" max="50" style="width: 200px;"></el-slider>
      </div>
      <el-button type="primary" style="margin-left: 30px;" @click="getData">查询</el-button>
    </div>

    <div style="margin-top: 30px">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="time" label="日期（UTC+0）" width="180"> </el-table-column>
        <el-table-column prop="column" label="频道" width="180"> </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
        <template #default="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getNews } from "@/api/user";
import { getSource } from "@/api/user";

export default {
  data() {
    return {
      options: [],
      source: '',
      nums: 20,

      tableData: [],
    };
  },
  mounted() {
    getSource().then(res => {
      this.options = res
    })
  },
  methods: {
    handleClick(row) {
      console.log(row)
      window.open(row.link, '_blank')
    },

    getData() {
      getNews({'source': this.source, 'limit': this.nums}).then(res => {
        this.tableData = res
      });
    }
  }
}
</script>