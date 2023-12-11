<template>
    <div style="display: flex; flex-direction: column;">
      <div class="searchConditionsDiv">
        <span class="searchConditionsTitle">搜索条件设置</span>
        <el-row class="searchConditions">
          <!-- <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
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
          </el-col> -->
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <span class="searchText">新闻来源</span>
            <el-select v-model="source" clearable placeholder="请选择" :multiple=true style="margin-left: 15px; width: 260px;">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <span class="searchText">新闻发布时间范围</span>
            <el-date-picker
              v-model="publish_time"
              type="daterange"
              unlink-panels
              range-separator="到"
              start-placeholder="起始日期"
              end-placeholder="结束日期"
              :editable="false"
              style="margin-left: 15px; width: 300px;"
            />
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <span class="searchText">关键词</span>
            <el-select
              v-model="keywords"
              multiple
              filterable
              allow-create
              default-first-option
              :reserve-keyword="false"
              placeholder="请输入关键字"
              style="margin-left: 15px; width: 300px"
            />
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
            <span class="searchText">重要程度</span>
            <el-select v-model="level" clearable placeholder="请选择" :multiple=true style="margin-left: 15px; width: 260px;">
              <el-option
                v-for="item in levels"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <span class="searchText">首次采集时间范围</span>
                <el-date-picker
                        v-model="first_fetch_time"
                        type="daterange"
                        unlink-panels
                        range-separator="到"
                        start-placeholder="起始日期"
                        end-placeholder="结束日期"
                        :editable="false"
                        style="margin-left: 15px; width: 300px;"
                />
            </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
<!--            <span class="searchText">末次采集时间范围</span>-->
<!--            <el-date-picker-->
<!--              v-model="end_fetch_time"-->
<!--              type="daterange"-->
<!--              unlink-panels-->
<!--              range-separator="到"-->
<!--              start-placeholder="起始日期"-->
<!--              end-placeholder="结束日期"-->
<!--              :editable="false"-->
<!--              style="margin-left: 15px; width: 300px;"-->
<!--            />-->
          </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <span class="searchText">新闻分类</span>
                <el-select v-model="type" clearable placeholder="请选择" :multiple=true style="margin-left: 15px; width: 260px;">
                    <el-option
                            v-for="item in types"
                            :key="item"
                            :label="item"
                            :value="item"
                    />
                </el-select>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <span class="searchText">末次采集时间范围</span>
                <el-date-picker
                        v-model="end_fetch_time"
                        type="daterange"
                        unlink-panels
                        range-separator="到"
                        start-placeholder="起始日期"
                        end-placeholder="结束日期"
                        :editable="false"
                        style="margin-left: 15px; width: 300px;"
                />
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
          <el-table-column prop="time" label="新闻发布日期（UTC+8）" width="180"/>
          <el-table-column prop="fetch_number" label="采集次数" width="120"/>
<!--          <el-table-column prop="end_rank" label="末次排名" width="120"/>-->
          <el-table-column prop="history_highest_rank" label="历史最高排名" width="120"/>
          <el-table-column prop="simple_title" label="标题"/>
          <!-- <el-table-column prop="text" label="正文" height="10"/> -->
          <el-table-column prop="type" label="分类" width="180"/>
          <el-table-column prop="level" label="重要程度" width="180"/>
          <el-table-column fixed="right" label="操作" width="200">
            <template #default="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small"
              >跳转
              </el-button
              >
              <el-button @click="handleClick3(scope.row)" type="text" size="small"
              >新闻内容
              </el-button
              >
              <el-button @click="handleClick2(scope.row)" type="text" size="small"
              >相关新闻
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
  import {getTwElectionList, exportTwElection} from "@/api/user";
  import {getTwElectionSource, updateTwElectionInfo} from "@/api/user";

  export default {
    data() {
      return {
        options: [],
        types: [
            '政治',
            '社会',
            '军事',
            '经济',
            '教育',
            '科技',
            '体育',
            '文娱',
            '其他'
        ],
        levels: [0,1,2,3],
        source: '',
        nums: 0,
        publish_time: '',
        first_fetch_time: '',
        end_fetch_time: '',
        level: [],
        type: [],
        keywords: [],
        exportType: 'excel',

        tableData: [],
        currentPage: 0,
        limit: 20,
        total: 0,
      };
    },
    mounted() {
      getTwElectionSource().then(res => {
        this.options = res.data;
      });
    },
    methods: {
      handleClick(row) {
        // console.log(row);
        window.open(row.link, "_blank");
      },
      //更新新闻分类
      updateType(row) {
        let updateData = {
            '_id' : row._id,
            'type' : row.type
        }
        updateTwElectionInfo(updateData).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
        });
      },
      //更新新闻分类
      updateLevel(row) {
        let updateData = {
            '_id' : row._id,
            'level' : row.level
        }
        updateTwElectionInfo(updateData).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
        });
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
        exportTwElection({
          'source': this.source,
          'level': this.level,
          'type': this.type,
          'publish_time': this.publish_time,
          'first_fetch_time': this.first_fetch_time,
          'end_fetch_time': this.end_fetch_time,
          'keywords': this.keywords,
          'exportType': this.exportType,
          'search_type': 'show'
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
      handleClick3(row) {
        ElMessageBox.alert(row.simple_text, row.title, {
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
        this.keywords = [];
        this.publish_time = '';
        this.source = '';
        this.level = '';
        this.first_fetch_time = '';
        this.type = '';
        this.end_fetch_time = '';
      },
      getData(newSearch) {
        // if (this.keyword.length === 0) {
        //   this.showWarning('请填入关键字');
        //   return
        // }
        // if (this.source === '') {
        //   this.showWarning('请选择新闻来源');
        //   return;
        // }
        // if (this.time === '') {
        //   this.showWarning('请选择查询时间范围');
        //   return;
        // }
        let data = {
          'source': this.source,
          'level': this.level,
          'type': this.type,
          'publish_time': this.publish_time,
          'first_fetch_time': this.first_fetch_time,
          'end_fetch_time': this.end_fetch_time,
          'limit': this.limit,
          'keywords': this.keywords,
          'search_type': 'show'
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
        getTwElectionList(data).then(res => {

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
