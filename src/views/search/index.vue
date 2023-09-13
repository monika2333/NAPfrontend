<template>
  <div>
    <div style="display: flex; align-items: center">
      <div>
        <span class="searchText">信息来源：</span>
        <el-select v-model="source" clearable placeholder="请选择" style="width: 250px;">
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
        <span class="searchText">信息数量：</span>
        <el-slider v-model="nums" max="1000" style="width: 250px;"></el-slider>
      </div>
      <div style="display: flex; align-items: center; margin-left: 30px;">
        <span class="searchText">时间范围：</span>
        <span>{{ time }}</span>
        <el-date-picker
          v-model="time"
          type="daterange"
          unlink-panels
          range-separator="到"
          start-placeholder="起始日期"
          end-placeholder="结束日期"
        />
      </div>
    </div>
    <div style="display: flex; align-items: center; margin-top: 30px">
      <div style="display: flex; align-items: center">
        <span class="searchText">关键词（多个关键词请用英文逗号分割）：</span>
        <el-input v-model="keyword" style="width: 400px;"/>
      </div>
      <el-button type="primary" style="margin-left: auto;" @click="getData">查询</el-button>
      <el-button type="primary" style="margin-left: 10px;">清空条件</el-button>
    </div>

    <div style="margin-top: 30px">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="time" label="日期（UTC+8）" width="180"> </el-table-column>
        <el-table-column prop="column" label="频道" width="180"> </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">跳转</el-button>
            <el-button @click="handleClick2(scope.row)" type="text" size="small">简略信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { ElMessageBox } from 'element-plus';
import { getNews } from "@/api/user";
import { getSource } from "@/api/user";


export default {
  data() {
    return {
      options: [],
      source: '',
      nums: 200,
      time: '',
      keyword: '',

      tableData: [],

      drawer: false,
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
    handleClick2(row) {
      ElMessageBox.alert(
        row.summary,
        row.title,
        {
          dangerouslyUseHTMLString: true,
        }
      )
    },

    getData() {
      getNews({'source': this.source, 'limit': this.nums}).then(res => {
        this.tableData = res
      });
    },
  }
}
</script>