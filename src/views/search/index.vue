<template>
  <div>
    <div style="display: flex; align-items: center">
      <div>
        <span class="searchText">信息来源：</span>
        <el-select v-model="source" clearable placeholder="请选择" style="width: 250px;" :multiple=true>
          <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </div>
      <div style="display: flex; align-items: center; margin-left: 30px">
        <span class="searchText">时间范围：</span>
        <el-date-picker
          v-model="time"
          type="daterange"
          unlink-panels
          range-separator="到"
          start-placeholder="起始日期"
          end-placeholder="结束日期"
          :disabled-date="disabledDate"
          :editable="false"
        />
      </div>
    </div>
    <div
      style="
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-top: 30px;
        justify-content: space-between;
        flex-wrap: wrap;
      "
    >
      <div style="display: flex; align-items: center">
        <span class="searchText">关键词：</span>
        <el-select
          v-model="keyword"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="请输入关键字"
        >
        </el-select>
      </div>
      <div>
        <el-dropdown @click="handleDropdownMenuClick" @command="handleCommand" size="default" split-button
                     type="primary">
          <span class="el-dropdown-link">
            导  出
            <el-icon class="el-icon--right"><ArrowDown/></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="excel">Excel</el-dropdown-item>
              <el-dropdown-item command="csv">CSV</el-dropdown-item>
              <el-dropdown-item command="json">Json</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <span>&NonBreakingSpace;</span>
        <el-button type="primary" @click="getData(true)">查询</el-button>
        <el-button type="primary" @click="handleClearConditions">清空条件</el-button>
      </div>
    </div>

    <div style="margin-top: 30px">
      <el-table :data="showData" stripe style="width: 100%">
        <el-table-column prop="time" label="日期（UTC+8）" width="180"/>
        <el-table-column prop="column" label="频道" width="180"/>
        <el-table-column prop="title" label="标题"/>
        <el-table-column fixed="right" label="操作" width="200">
          <template #default="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
            >跳转
            </el-button
            >
            <el-button @click="handleClick2(scope.row)" type="text" size="small"
            >简略信息
            </el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next ,total"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :default-page-size="20"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {ElMessageBox, ElMessage} from "element-plus";
import {getNews, exportData} from "@/api/user";
import {getSource} from "@/api/user";
import {ArrowDown} from '@element-plus/icons-vue';

export default {
  data() {
    return {
      options: [],
      source: '',
      nums: 0,
      time: '',
      keyword: [],
      exportType: 'excel',

      tableData: [],
      currentPage: 0,
      limit: 20,
      total: 0,
    };
  },
  mounted() {
    getSource().then(res => {
      this.options = res.data;
    });
  },
  methods: {
    handleClick(row) {
      // console.log(row);
      window.open(row.link, "_blank");
    },
    handleCommand(command) {
      this.exportType = command;
    },
    // 导出数据
    handleDropdownMenuClick() {
      if (!this.total) {
        this.showWarning('请先查询');
        return;
      }
      exportData({
        'source': this.source,
        'time': this.time,
        'keyword': this.keyword,
        'exportType': this.exportType,
      }).then(res => {
        let filename;
        if (this.exportType === 'excel') {
          filename = "export" + ".xlsx";
        }else if (this.exportType === 'csv') {
          filename = "export" + ".csv";
        } else {
          filename = "export" + ".json"
        }
        const url = window.URL.createObjectURL(new Blob([res]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      });
    },
    disabledDate(time) {
      // 获取当前日期
      const today = new Date();
      // 禁用大于今天的日期
      return time.getTime() > today.getTime();
    },
    handleClick2(row) {
      ElMessageBox.alert(row.summary, row.title, {
        dangerouslyUseHTMLString: true,
        closeOnPressEscape: true,
      });
    },
    // 封装用户提示
    showWarning(content) {
      return ElMessage({
        message: content,
        type: 'warning'
      });
    },
    //改变页码
    handleCurrentChange(e) {
      this.currentPage = e;
      this.getData(false)
    },
    //改变页数限制
    handleSizeChange(e) {
      this.limit = e;
    },
    // 清空条件
    handleClearConditions() {
      this.keyword = [];
      this.time = '';
      this.source = '';
    },
    getData(newSearch) {
      if (this.keyword.length === 0) {
        this.showWarning('请填入关键字');
        return
      }
      if (this.source === '') {
        this.showWarning('请选择新闻来源');
        return;
      }
      if (this.time === '') {
        this.showWarning('请选择查询时间范围');
        return;
      }
      let data = {
        'source': this.source,
        'limit': this.limit,
        'time': this.time,
        'keyword': this.keyword
      }
      if (newSearch) {
        data.current_page = 0;
        if (this.tableData) {
          this.tableData = [];
          this.total = 0;
          this.currentPage = 0;
        }
      } else {
        data.current_page = this.currentPage;
      }
      getNews(data).then(res => {

        // console.log(res)
        this.tableData = res.data.ret;
        this.total = res.data.count;
      });
    },
  },
  computed: {
    showData() {
      console.log(this.currentPage);
      return this.tableData;
    }
  },
};
</script>

<style scoped>
.pagination {
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
