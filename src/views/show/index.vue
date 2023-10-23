<template>
    <div style="display: flex; flex-direction: column;">
      <div class="searchConditionsDiv">
        <span class="searchConditionsTitle">搜索条件设置</span>
        <el-row class="searchConditions">
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <span class="searchText">关键词</span>
            <el-select
              v-model="keyword"
              multiple
              filterable
              allow-create
              default-first-option
              :reserve-keyword="false"
              placeholder="请输入关键字"
              style="margin-left: 15px; width: 300px;"
            />
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <span class="searchText">信息来源</span>
            <el-select v-model="platform" clearable placeholder="请选择" :multiple=true style="margin-left: 15px; width: 260px;">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
        </el-row>
        <el-row class="searchConditions">
          
        </el-row>
      </div>
      <div class="searchButtons">
        <el-button-group>
          <el-button type="primary" @click="getData(true)" :icon="Search"><span style="font-size: 13px; font-weight: 700;">查询</span></el-button>
          <el-button type="warning" @click="handleClearConditions" :icon="Refresh"><span style="font-size: 13px; font-weight: 700;">重置</span></el-button>
        </el-button-group>
        <el-dropdown @click="handleDropdownMenuClick"
            @command="handleCommand"
            size="default"
            split-button
            type="primary"
            style="margin-left: 15px;">
          <el-icon><Download/></el-icon>
          <span style="font-size: 13px; font-weight: 700;">导出（{{ exportType }}）</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="excel">Excel</el-dropdown-item>
              <el-dropdown-item command="csv">CSV</el-dropdown-item>
              <el-dropdown-item command="json">Json</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        </div>
      <div class="searchResults">
        <el-table :data="showData" stripe style="width: 100%">
          <el-table-column prop="time" label="日期（UTC+8）" width="180"/>
          <el-table-column prop="type" label="频道" width="180"/>
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
  
  <script setup>
  import {Search, Refresh, Download} from '@element-plus/icons-vue';
  </script>
  
  <script>
  import {ElMessageBox, ElMessage} from "element-plus";
  import {getInfos, exportData} from "@/api/user";
  import {getPlatform} from "@/api/user";
  
  export default {
    data() {
      return {
        options: [],
        platform: '',
        nums: 0,
        // time: '',
        keyword: [],
        exportType: 'excel',
  
        tableData: [],
        currentPage: 0,
        limit: 20,
        total: 0,
      };
    },
    mounted() {
      getPlatform().then(res => {
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
          'platform': this.platform,
        //   'time': this.time,
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
        ElMessageBox.alert(row.text, row.title, {
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
        this.platform = '';
      },
      getData(newSearch) {
        if (this.keyword.length === 0) {
          this.showWarning('请填入关键字');
          return
        }
        if (this.platform === '') {
          this.showWarning('请选择新闻来源');
          return;
        }
        // if (this.time === '') {
        //   this.showWarning('请选择查询时间范围');
        //   return;
        // }
        let data = {
          'platform': this.platform,
          'limit': this.limit,
        //   'time': this.time,
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
        getInfos(data).then(res => {
  
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
  .searchConditionsDiv{
    padding: 10px;
    border: 0.5px solid rgb(188, 188, 188);
    border-radius: 30px;
    background-color: rgb(238, 238, 238);
  }
  .searchConditionsTitle{
    font-weight: bold;
    font-size: 20px;
    margin-left: 20px;
  }
  .searchConditions{
    margin: 20px 10px 10px 10px; /*上 右 下 左*/
  }
  .searchButtons{
    margin-top: 20px;
    margin-left: auto;
    margin-right: 10px;
  }
  .searchText{
    color: rgb(74, 74, 74);
    font-weight: bold;
    font-size: 15px;
  }
  .searchResults{
    margin-top: 20px
  }
  </style>
  