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
    <div style="display: flex; flex-direction:row; align-items: center; margin-top: 30px; justify-content:space-between;flex-wrap: wrap">
      <div style="display: flex; align-items: center">
        <span class="searchText">关键词（多个关键词请用英文逗号分割）：</span>
        <el-input v-model="keyword" style="width: 400px;"/>
      </div>
      <div>
        <el-button type="primary" @click="getData">查询</el-button>
        <el-button type="primary">清空条件</el-button>
      </div>
    </div>

    <div style="margin-top: 30px">
      <el-table :data="showData" stripe style="width: 100%">
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
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next ,total,sizes"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
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
      nums: 20,
      time: '',
      keyword: '',

      tableData: [],
      page: 1,
      limit: 10,
      total: 0,
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
    //改变页码
    handleCurrentChange(e){
      this.page = e;
    },
    //改变页数限制
    handleSizeChange(e){
      this.limit = e;
    },

    getData() {
      // console.log(this.time)
      // console.log(this.keyword)
      getNews({'source': this.source, 'limit': this.nums, 'time': this.time, 'keyword': this.keyword}).then(res => {
        this.tableData = res
        this.total = this.tableData.length
      });
    },
  },
  computed: {
    showData(){
      return this.tableData.filter(
        (item, index) =>
          index < this.page * this.limit &&
          index >= this.limit * (this.page - 1)
      );
    }
  },
}
</script>

<style scoped>
.pagination{
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>