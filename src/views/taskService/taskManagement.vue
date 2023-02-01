<template>
    <div class="container-bg">
      <div class="container">
          <!-- 搜索部分 -->
          <div class="search-section">
              <el-row>
                  <el-col>
                      <el-form ref="searchFormRef" :model="searchForm" :inline="true" style="width:100%">
                          <el-row>
                            <el-col :span="6">
                                  <el-form-item label="用户名称" prop="userName">
                                      <el-input v-model.userName="searchForm.userName"
                                          placeholder="请输入名称" clearable/>
                                  </el-form-item>
                              </el-col>
                              <el-col :span="18">
                                  <el-form-item label="书籍名称" prop="bookName">
                                      <el-input v-model.bookName="searchForm.bookName"
                                          placeholder="请输入名称" clearable/>
                                  </el-form-item>
                              </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="6">
                                <el-form-item label="任务创建、结束时间">
                                    <el-date-picker
                                        v-model="value1"
                                        type="datetimerange"
                                        range-separator="To"
                                        start-placeholder="任务创建时间"
                                        end-placeholder="任务结束时间"
                                        :size="size"
                                        format="YYYY/MM/DD HH:mm:ss"
                                        value-format="YYYY-MM-DD HH:mm:ss"
                                    />
                                </el-form-item>
                              </el-col>
                              <el-col :span="13">
                                  <el-form-item style="float: right;">
                                      <el-button type="success" @click="selectForm(searchFormRef)">查询</el-button>
                                      <el-button @click="resetForm()" type="info">重置</el-button>
                                  </el-form-item>
                              </el-col>
                          </el-row>
                      </el-form>
                  </el-col>
              </el-row>
          </div>

          <!-- 表格部分 -->
          <div class="table-bg" ref="tableContainer" style="width: 99%;">
              <el-table :data="baseInfoTableData" :border="true" 
                  ref="baseInfoTableDataRef" v-loading="loading" :header-cell-style="{ background: '#F5F6FA' }"
                  :height="500">
                  <el-table-column label="操作" fixed="left" min-width="170">
                      <template #default="scope">
                          <el-button type="primary" link @click="updateProlongTask(scope.row)">任务延长</el-button>
                          <el-button type="danger" link @click="deleteTask(scope.row)">删除任务</el-button>
                        </template>
                  </el-table-column>
                  <el-table-column prop="id" label="词条id" min-width="130" :show-overflow-tooltip="true" />
                  <el-table-column prop="taskCreateTime" label="创建时间" min-width="170" />
                  <el-table-column prop="taskLoadTime" label="结束时间" min-width="170" />
                  <el-table-column prop="userName" label="创建人" min-width="120" />
                  <el-table-column prop="bookName" label="书籍" min-width="200" :show-overflow-tooltip="true" />
                  <el-table-column prop="directoryName" label="章节" min-width="200" :show-overflow-tooltip="true" />
                  <el-table-column prop="staticZ" label="状态" min-width="120">
                    <template #default="scope">
                                <span v-if="scope.row.staticZ === 1">未完成</span>
                                <span v-if="scope.row.staticZ === 2">已完成</span>
                                <span v-if="scope.row.staticZ === 3">超市</span>
                            </template>
                  </el-table-column>
              </el-table>
          </div>
          <!--分页器 start-->
          <div class="flex pagination-bg">
              <el-pagination v-model:currentPage="pCurrentPage" v-model:page-size="pPageSize"
                  :page-sizes="[10, 20]" :small="pSmall" :disabled="pDisabled" :background="pBackground"
                  layout="total, sizes, prev, pager, next, jumper" :total="pTotal" @size-change="handleSizeChange"
                  @current-change="handleCurrentChange" />
          </div>
          <!--分页器 end-->
           <!-- 任务延长对话框 -->
            <el-dialog title="任务延长" v-model="dialogFormVisible">
                <el-form>
                    <el-form-item label="延长时间">
                        <el-date-picker
                            v-model="value2"
                            type="datetime"
                            format="YYYY/MM/DD HH:mm:ss"
                            value-format="YYYY-MM-DD HH:mm:ss"
                            placeholder="选择延长时间"
                        />
                    </el-form-item>
                </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="prolongTaskConfirm()"
                            >确 定</el-button
                        >
                        </span>
                    </template>
          </el-dialog>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { deleteTaskAPI, getTakeListByPageAPI, prolongTaskAPI } from "@/api/taskAssignmentManagement";
import { reactive } from "@vue/reactivity";
import { ElMessage, ElMessageBox, FormInstance } from "element-plus";
import { onMounted, ref } from "vue";
//加载
const loading = ref<boolean>(false)
//table赋值
const baseInfoTableData = ref([]);
// 总数
const pTotal = ref(0);
// 第几页
const pCurrentPage = ref<number>(1);
// 每页多少条
const pPageSize = ref<number>(10);
const pSmall = ref(false);
const pDisabled = ref(false);
const pBackground = ref(false);
const handleSizeChange = (val: number) => {
pPageSize.value = val;
loadTakeListByPage();
};
const handleCurrentChange = (val: number) => {
pCurrentPage.value = val;
loadTakeListByPage();
};
const searchFormRef = ref<FormInstance>()
//查询参数
const searchForm = reactive({
    bookName:"",
    userName:"",
    taskCreateTime:"",
    taskLoadTime:"",
})
//时间赋值
const value1 = ref('')
const size = ref<'default' | 'large' | 'small'>('default')
// 重置查询条件
const resetForm = () => {
//清空查询框数据
searchForm.bookName = "";
searchForm.userName = "";
searchForm.taskCreateTime = "";
searchForm.taskLoadTime = "";
value1.value = "";
//分页器重置为第一页
pCurrentPage.value = 1;
pPageSize.value = 10;
//重新获取数据
loadTakeListByPage();
};
//查询分页列表
const selectForm = (formEl: FormInstance | undefined) => {
if(!formEl) return;
formEl.validate((valid) => {
    if(valid){
         loadTakeListByPage();
    }else{
         console.log('error');
         return false;
    }
})
}
//任务延长对话框开关
const dialogFormVisible = ref<boolean>(false);
//时间赋值
const value2 = ref('')
//定义添加用户的任务id
const taskId = ref<string>('');
//任务延长
const updateProlongTask = async(row:any) =>{
dialogFormVisible.value = true;
taskId.value = row.id;
}

//确认任务延长
const prolongTaskConfirm = async() =>{
await prolongTask()
dialogFormVisible.value = false;
await loadTakeListByPage()
}

//删除任务
const deleteTask = async(row:any) => {
ElMessageBox.confirm("确认删除?", {
  confirmButtonText: "是",
  cancelButtonText: "否",
  type: "warning",
})
  .then(async () => {
      //删除的过渡效果
      loading.value = true;
      const res = await deleteTaskAPI({id:row.id});
      if (res.data.code == 200) {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
          loadTakeListByPage();
      } else {
          ElMessage.error(res.data.msg)
      }
      loading.value = false;
  })
  .catch(() => {console.log('error');});
}

//获取列表
const loadTakeListByPage = async () => {
loading.value = true;
try{
    const res = await getTakeListByPageAPI({
         pageNum:pCurrentPage.value,
         pageSize:pPageSize.value,
         bookName:searchForm.bookName,
         userName:searchForm.userName,
         taskCreateTime:searchForm.taskCreateTime = value1.value[0],
         taskLoadTime:searchForm.taskLoadTime = value1.value[1],
    })
    baseInfoTableData.value = res.data.data.records;
    pTotal.value = res.data.data.total;
}catch(error){
    console.log('error');
}
loading.value = false;
}

//延长任务
const prolongTask = async () => {
loading.value = true;
try{
    const res = await prolongTaskAPI({
      id:taskId.value,
      taskLoadTime:value2.value,
    })
    if(res.data.code === 200){
        ElMessage({
              message: "延长成功",
              duration: 1500,
              type: "success",
          });
    }
    else if(res.data.code === 500){
        ElMessage({
              message: "延长失败",
              duration: 1500,
              type: "warning",
          });
    }
}catch(error){
    console.log('error');
}
loading.value = false;
taskId.value = '';
}
onMounted(() => {
loadTakeListByPage();
})
</script>

<style lang="scss" scoped>

</style>