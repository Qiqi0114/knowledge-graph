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
                                  <el-form-item label="姓名" prop="bookName">
                                      <el-input v-model.bookName="searchForm.bookName"
                                          placeholder="请输入姓名" />
                                  </el-form-item>
                              </el-col>
                              <el-col :span="12">
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
                  <el-table-column label="操作" min-width="100">
                      <template #default="scope">
                          <el-button type="text" @click="deleteUserManagement(scope.row)">删除</el-button>
                      </template>
                  </el-table-column>
                  <el-table-column prop="id" label="用户id" min-width="130" />
                  <el-table-column prop="bookName" label="用户全称" min-width="120" />
                  <el-table-column prop="bookStatic" label="用户状态" min-width="120">
                      <template #default="scope">
                          <el-button type="text" :disabled="scope.row.bookStatic ? true : false"
                              @click="updateActivationStatus(scope.row,true)">上架</el-button>
                          <el-button type="text" :disabled="scope.row.bookStatic ? false : true"
                              @click="updateActivationStatus(scope.row,false)">下架</el-button>
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
      </div>
  </div>
</template>

<script lang="ts" setup>
import { BookManagementAPI, deleteBookManagementAPI, getBookOnAndOffAPI } from "../../api/bookManagement";
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
loadUserManagementInfoList();
};
const handleCurrentChange = (val: number) => {
pCurrentPage.value = val;
loadUserManagementInfoList();
};
const searchFormRef = ref<FormInstance>()
//查询参数
const searchForm = reactive({
bookName:"",
})
// 重置查询条件
const resetForm = () => {
//清空查询框数据
searchForm.bookName = "";
//分页器重置为第一页
pCurrentPage.value = 1;
pPageSize.value = 10;
//重新获取数据
loadUserManagementInfoList();
};
//查询分页列表
const selectForm = (formEl: FormInstance | undefined) => {
if(!formEl) return;
formEl.validate((valid) => {
    if(valid){
         loadUserManagementInfoList();
    }else{
         console.log('error');
         return false;
    }
})
}

//删除用户信息
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
      if (res.data.code === "200") {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
          loadUserManagementInfoList();
      } else {
          ElMessage.error(res.data.msg)
      }
      loading.value = false;
  })
  .catch(() => {console.log('erroe');});
}
//书籍上架下架 getBookOnAndOffAPI
const updateActivationStatus = async(row,type) => {
loading.value = true;
try{
  const res = await getBookOnAndOffAPI({
      id:row.id,
      bookStatic:type
  })
  if (res.data.code === "200") {
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
}catch(error){}
loading.value = false;
}
//获取列表
const loadUserManagementInfoList = async () => {
loading.value = true;
try{
    const res = await BookManagementAPI({
         pageNum:pCurrentPage.value,
         pageSize:pPageSize.value,
         bookName:searchForm.bookName
    })
    console.log(res.data.data.records);
    baseInfoTableData.value = res.data.data.records;
    pTotal.value = res.data.data.total;
}catch(error){
    console.log('error');
}
loading.value = false;
}


onMounted(() => {
loadUserManagementInfoList();
})
</script>

<style lang="scss" scoped>

</style>