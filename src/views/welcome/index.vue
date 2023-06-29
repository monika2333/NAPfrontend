<template>
  <div>
  <div style="margin-bottom: 20px;">
    <span style="font-size: 20px; font-weight: bold; line-height: 40px;">ABCnews最新信息</span>
    <el-table :data="tableData1" stripe style="width: 100%">
      <el-table-column prop="time" label="日期" width="180"> </el-table-column>
      <el-table-column prop="column" label="频道" width="180"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
      <template #default="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>

  <div style="margin-bottom: 20px;">
    <span style="font-size: 20px; font-weight: bold; line-height: 40px;">BBC最新信息</span>
    <el-table :data="tableData2" stripe style="width: 100%">
      <el-table-column prop="time" label="日期" width="180"> </el-table-column>
      <el-table-column prop="column" label="频道" width="180"> </el-table-column>
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
      <template #default="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>

  <div>
    <span style="font-size: 20px; font-weight: bold; line-height: 40px;">Financial Times最新信息</span>
    <el-table :data="tableData3" stripe style="width: 100%">
      <el-table-column prop="time" label="日期" width="180"> </el-table-column>
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
import { get1 } from "@/api/user";
import { get2 } from "@/api/user";
import { get3 } from "@/api/user";

export default {
  data() {
    return {
      tableData1: [],
      tableData2: [],
      tableData3: []
    };
  },
  mounted() {
    get1().then(res => {
      this.tableData1 = res
    });
    get2().then(res => {
      this.tableData2 = res
    });
    get3().then(res => {
      this.tableData3 = res
    });
  },
  methods: {
    handleClick(row) {
      console.log(row)
      window.open(row.link, '_blank')
    }
  }
}
</script>