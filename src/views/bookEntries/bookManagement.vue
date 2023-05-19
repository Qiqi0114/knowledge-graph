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
                                  <el-form-item label="书籍名称" prop="bookName">
                                      <el-input v-model.bookName="searchForm.bookName"
                                        @input="loadBookManagementInfoList()" placeholder="请输入书籍名称" clearable/>
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
                  :height="450">
                  <el-table-column label="操作" min-width="50">
                      <template #default="scope">
                          <el-button type="danger" link @click="deleteUserManagement(scope.row)">删除</el-button>
                      </template>
                  </el-table-column>
                  <el-table-column prop="id" label="书籍id" min-width="130" />
                  <el-table-column prop="bookName" label="书籍全称" min-width="250" :show-overflow-tooltip="true" />
                  <el-table-column prop="bookStatic" label="书籍状态" min-width="120">
                      <template #default="scope">
                          <el-button type="text" :disabled="scope.row.bookStatic ? true : false"
                              @click="updateActivationStatus(scope.row,true)">上架</el-button>
                          <el-button type="text" :disabled="scope.row.bookStatic ? false : true"
                              @click="updateActivationStatus(scope.row,false)">下架</el-button>
                      </template>
                  </el-table-column>
                  <el-table-column label="操作" min-width="150">
                      <template #default="scope">
                          <el-button type="primary" link @click="seeAtlas(scope.row)">查看图谱</el-button>
                          <el-button type="primary" link @click="uploadJson(scope.row)">导出json</el-button>
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
          <el-dialog v-model="dialogFormVisible" title="查看图谱" style="width: 1200px;height: 700px;margin-top: 10px;">
            <div>
                
            </div>
          </el-dialog>
          <el-dialog v-model="dialogFormVisible1" title="选择环境" style="width: 450px;height: 200px;margin-top: 60px;">
            <el-button @click="uploadJsonConfirm('1')">开发环境</el-button>
            <el-button @click="uploadJsonConfirm('2')">生产环境</el-button>
          </el-dialog>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { BookManagementAPI, deleteBookManagementAPI, getBookOnAndOffAPI, getUploadJsonAPI } from "../../api/bookManagement";
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
loadBookManagementInfoList();
};
const handleCurrentChange = (val: number) => {
pCurrentPage.value = val;
loadBookManagementInfoList();
};
const searchFormRef = ref<FormInstance>()
//查询参数
const searchForm = reactive({
bookName:"",
})

//删除书籍信息
const deleteUserManagement = async(row:any) => {
ElMessageBox.confirm("确认删除?", {
  confirmButtonText: "是",
  cancelButtonText: "否",
  type: "warning",
})
  .then(async () => {
      //删除的过渡效果
      loading.value = true;
      const res = await deleteBookManagementAPI({id:row.id});
      if (res.data.code == 200) {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
          loadBookManagementInfoList();
      } else {
          ElMessage.error(res.data.msg)
      }
      loading.value = false;
  })
  .catch(() => {console.log('erroe');});
}
//书籍上架下架 getBookOnAndOffAPI
const updateActivationStatus = async(row:any,type:boolean) => {
loading.value = true;
try{
  const res = await getBookOnAndOffAPI({
      id:row.id,
      bookStatic:type
  })
  if (res.data.code == 200) {
      ElMessage({
          message: res.data.msg,
          duration: 5000,
          type: "success",
      });
  } else {
      //失败
      ElMessage({
          message: res.data.msg,
          duration: 5000,
          type: "error",
      });
  }
  await loadBookManagementInfoList();
}catch(error){}
loading.value = false;
}
//查看图谱对话框
const dialogFormVisible = ref<boolean>(false);
//书籍id
const bookId =ref<string>();
//任务延期
const seeAtlas = async (row: any) => {
    dialogFormVisible.value = true;
    bookId.value = row.id;
};
const dialogFormVisible1 = ref<boolean>(false);
//书籍id
const bookId1 =ref<string>('');
//下载Json
const uploadJson = async(row:any)=>{
    dialogFormVisible1.value = true;
    bookId1.value = row.id;
}
let url: any = import.meta.env // 配置不同环境的域名信息等
const uploadJsonConfirm =async (type:string) => {
    //过渡效果
    loading.value = true;
    location.href = url.VITE_APP_BASE_API+'/service_book/service/entry/getJsonText'+'?id='+bookId.value+'&type='+type
      const res = await getUploadJsonAPI({id:bookId1.value,type:type});
      if (res.data.code == 200) {
          ElMessage({
              message: "下载成功",
              duration: 1500,
              type: "success",
          });
      } else {
          ElMessage.error(res.data.msg)
      }
      dialogFormVisible1.value = false
      loading.value = false;
}
//获取列表
const loadBookManagementInfoList = async () => {
loading.value = true;
try{
    const res = await BookManagementAPI({
         pageNum:pCurrentPage.value,
         pageSize:pPageSize.value,
         bookName:searchForm.bookName
    })
    baseInfoTableData.value = res.data.data.records;
    pTotal.value = res.data.data.total;
}catch(error){
    console.log('error');
}
loading.value = false;
}


onMounted(() => {
loadBookManagementInfoList();
})
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";
</style>