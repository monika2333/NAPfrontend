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
          <span class="searchText">新闻发布时间范围</span>
          <el-date-picker
            v-model="publish_time"
            type="daterange"
            value-format="YYYY-MM-DD"
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
          <span class="searchText">采集时间范围</span>
          <el-date-picker
            v-model="fetch_time"
            type="daterange"
            value-format="YYYY-MM-DD"
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
        <el-button type="primary" circle class="button" @click="showAddSidebar">
          <el-icon :size="15"><Plus /></el-icon>
        </el-button>
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
        <el-table-column prop="type" label="上报内容类型" width="180"/>
        <el-table-column prop="number" label="上报期数" width="180"/>
        <el-table-column prop="report_date" label="上报日期" width="120"/>
        <el-table-column prop="title" label="标题" width="120"/>
        <!--          <el-table-column prop="end_rank" label="末次排名" width="120"/>-->
        <!--        <el-table-column prop="history_highest_rank" label="历史最高排名" width="120"/>-->
        <el-table-column prop="content" label="内容"/>
        <el-table-column prop="source_or_url" label="上报来源或链接" width="180" height="10"/>
        <el-table-column prop="add_time" label="添加时间" width="180">
          <!--          <template  #default="scope">-->
          <!--            <el-select v-model="sentimentType[scope.row.sentiment]" clearable placeholder="请选择" @blur="updateType(scope.row)">-->
          <!--              <el-option-->
          <!--                v-for="item in sentiment"-->
          <!--                :key="item.value"-->
          <!--                :label="item.key"-->
          <!--                :value="item.value"-->
          <!--              />-->
          <!--            </el-select>-->
          <!--          </template>-->
        </el-table-column>
<!--        <el-table-column prop="is_post" label="是否上报" width="180">-->
<!--          <template  #default="scope">-->
<!--            <el-select v-model="scope.row.is_post" clearable placeholder="请选择" @blur="updateLevel(scope.row)">-->
<!--              <el-option-->
<!--                v-for="item in isPostType"-->
<!--                :key="item.label"-->
<!--                :label="item.value"-->
<!--                :value="item.label"-->
<!--              />-->
<!--            </el-select>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column fixed="right" label="操作" width="200">
          <template #default="scope">
              <el-button @click="handleClick3(scope.row)" type="text" size="small"
              >更新
              </el-button
              >
              <el-button @click="handleClick(scope.row)" type="text" size="small"
              >删除
              </el-button
              >
            <!--            <el-button @click="handleClick2(scope.row)" type="text" size="small"-->
            <!--            >相关新闻-->
            <!--            </el-button-->
            <!--            >-->
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
    <el-drawer
      ref="drawer"
      v-model="drawer"
      direction="ltr"
      size="50%"
      :before-close="handleClose">
      <AddBjDailyReport ref="add" :submitClose="submitClose"></AddBjDailyReport>
    </el-drawer>
    <el-drawer
        ref="updateDrawer"
        v-model="updateDrawer"
        direction="ltr"
        size="50%"
        :before-close="handleUpdateClose">
      <UpdateBjDailyReport :bjDailyUpdateReport="updateBjDailyReport" ref="update" :submitClose="submitClose"></UpdateBjDailyReport>
    </el-drawer>
  </div>
</template>

<script setup>
import {Search, Refresh, Download, Plus} from '@element-plus/icons-vue';
</script>

<script>
import {ElMessageBox, ElMessage} from "element-plus";
import {getBjDailyReportList, exportBjDailyReport, delSourceMedia} from "@/api/user";
import {updateBjDailyInfo, deleteBjDailyReport} from "@/api/user";
import AddBjDailyReport from './addBjDailyReport.vue';
import UpdateBjDailyReport from './updateBjDailyReport.vue';

export default {
  data() {
    return {
      isPostType: [
        {
          "label": 1,
          "value": "已上报"
        },
        {
          "label": 2,
          "value": "未上报"
        }
      ],
      drawer: false,
      updateDrawer: false,
      updateBjDailyReport: {
        id: '',
        type: '',
        number: '',
        report_date: '',
        title: '',
        content: '',
        source_or_url: ''
      },
      source: '',
      nums: 0,
      publish_time: '',
      fetch_time: '',
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
  components: {
    AddBjDailyReport,
    UpdateBjDailyReport
  },
  // 初始化前准备数据
  mounted() {

  },
  methods: {
    handleClick(row) {
      // console.log(row);
      ElMessageBox.confirm(
          '确定删除吗？（此操作不可逆）',
      ).then(()=>{
            deleteBjDailyReport({id: row._id}).then(res => {
                  if(res.code === 0)
                  {
                    alert('删除成功')
                    this.submitClose()
                  }
                  else
                  {
                    alert('删除失败')
                  }
                }
            )
                .catch(() => {})
          })
    },
    //展示添加页面
    showAddSidebar(){
      this.drawer = true
    },
    handleClose(){
      ElMessageBox.confirm('确定要关闭吗？（你将失去所填内容）')
        .then(() => {
          this.$refs.drawer.close()
        })
        .catch(() => {

        })
    },
    handleUpdateClose(){
      ElMessageBox.confirm('确定要关闭吗？（你将失去所填内容）')
          .then(() => {
            this.$refs.updateDrawer.close()
          })
          .catch(() => {

          })
    },
    submitClose(){
      console.log('yes')
      this.getData(false)
      this.$refs.drawer.close()
      this.$refs.updateDrawer.close()
      this.$refs.add.bjDailyReport.content = ''
    },
    //更新是否上报
    updateLevel(row) {
      let updateData = {
        '_id' : row._id,
        'is_post' : row.is_post
      }
      updateBjDailyInfo(updateData).then(res => {
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
      exportBjDailyReport({
        'publish_time': this.publish_time,
        'fetch_time': this.fetch_time,
        'keywords': this.keywords,
        'exportType': this.exportType,
        'search_type': 'update'
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
      this.updateBjDailyReport.id = row._id
      this.updateBjDailyReport.type = row.type
      this.updateBjDailyReport.number = row.number
      this.updateBjDailyReport.report_date = row.report_date
      this.updateBjDailyReport.title = row.title
      this.updateBjDailyReport.content = row.content
      this.updateBjDailyReport.source_or_url = row.source_or_url
      this.updateDrawer = true
      // ElMessageBox.alert(row.simple_text, row.simple_title, {
      //   dangerouslyUseHTMLString: true,
      //   closeOnPressEscape: true,
      // });
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
        'publish_time': this.publish_time,
        'fetch_time': this.fetch_time,
        'limit': this.limit,
        'keywords': this.keywords,
        'search_type': 'update'
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
        getBjDailyReportList(data).then(res => {

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
