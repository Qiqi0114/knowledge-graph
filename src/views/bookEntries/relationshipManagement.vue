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
                                  <el-form-item label="关系姓名" prop="relationshipName">
                                      <el-input v-model.relationshipName="searchForm.relationshipName"
                                        @input="loadRelationshipList()"  placeholder="请输入姓名" clearable/>
                                  </el-form-item>
                              </el-col>
                              <el-col :span="4">
                                  <el-form-item style="float: right;">
                                      <el-button type="primary" @click="dialogAddFormVisible = true">添加关系</el-button>
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
                  <el-table-column label="操作" min-width="30">
                      <template #default="scope">
                          <el-button type="primary" link @click="updaterelationshipManagement(scope.row)">编辑
                          </el-button>
                          <el-button type="danger" link @click="deleteRelationship(scope.row)">删除</el-button>
                      </template>
                  </el-table-column>
                  <el-table-column prop="id" v-if="false" label="关系id" min-width="130" />
                  <el-table-column prop="relationshipName" label="关系名称" min-width="120" />
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
          <!-- 添加关系信息对话框 -->
          <el-dialog title="添加关系" v-model="dialogAddFormVisible">
              <el-form :model="addForm">
                  <el-form-item label="关系名称">
                      <el-input v-model="addForm.relationshipForm.relationshipName"></el-input>
                  </el-form-item>
              </el-form>
              <template #footer>
                  <span class="dialog-footer">
                  <el-button @click="dialogAddFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="addConfirm()"
                      >确 定</el-button
                  >
                  </span>
              </template>
          </el-dialog>
          <!-- 修改关系信息对话框 -->
          <el-dialog title="修改关系" v-model="dialogFormVisible">
              <el-form :model="updateForm">
                  <el-form-item label="关系id">
                      <el-input v-model="updateForm.relationshipForm.id"></el-input>
                  </el-form-item>
                  <el-form-item label="关系名称">
                      <el-input v-model="updateForm.relationshipForm.relationshipName"></el-input>
                  </el-form-item>
              </el-form>
              <template #footer>
                  <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="updateConfirm()"
                      >确 定</el-button
                  >
                  </span>
              </template>
          </el-dialog>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { addRelationshipAPI, deleteRelationshipAPI, getRelationshipListAPI, updateRelationshipAPI } from "@/api/relationshipManagement";
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
loadRelationshipList();
};
const handleCurrentChange = (val: number) => {
pCurrentPage.value = val;
loadRelationshipList();
};
const searchFormRef = ref<FormInstance>()
//查询参数
const searchForm = reactive({
relationshipName:"",
})

//添加关系信息对话框开关
const dialogAddFormVisible = ref<boolean>(false);
const addForm = reactive({
relationshipForm:{
  relationshipName:'',
}
});
//添加关系
const addConfirm = async() =>{
try{
  const res = await addRelationshipAPI({
      relationshipName:addForm.relationshipForm.relationshipName,
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
}catch(error){
  console.log('error');
}
dialogAddFormVisible.value = false;
loadRelationshipList();
addForm.relationshipForm.relationshipName = '';
}
//修改关系信息对话框开关List
const dialogFormVisible = ref<boolean>(false);
const updateForm = reactive({
relationshipForm:{
  id:'',
  relationshipName:'',
}
});

//编辑关系信息
const updaterelationshipManagement = async(row:any) =>{
dialogFormVisible.value = true;
updateForm.relationshipForm.id = row.id;
updateForm.relationshipForm.relationshipName = row.relationshipName;
}
//确认修改关系信息
const updateConfirm = async() =>{
await updateRelationshipById()
dialogFormVisible.value = false;
await loadRelationshipList()
}
//删除关系信息
const deleteRelationship = async(row:any) => {
ElMessageBox.confirm("确认删除?", {
  confirmButtonText: "是",
  cancelButtonText: "否",
  type: "warning",
})
  .then(async () => {
      //删除的过渡效果
      loading.value = true;
      const res = await deleteRelationshipAPI({id:row.id});
      if (res.data.code == 200) {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
          loadRelationshipList();
      } else {
          ElMessage.error(res.data.msg)
      }
      loading.value = false;
  })
  .catch(() => {console.log('error');});
}

//获取列表
const loadRelationshipList = async () => {
loading.value = true;
try{
    const res = await getRelationshipListAPI({
         pageNum:pCurrentPage.value,
         pageSize:pPageSize.value,
         relationshipName:searchForm.relationshipName
    })
    baseInfoTableData.value = res.data.data.records;
    pTotal.value = res.data.data.total;
}catch(error){
    console.log('error');
}
loading.value = false;
}

//修改关系信息 
const updateRelationshipById = async () => {
try{
  const res = await updateRelationshipAPI({
      id:updateForm.relationshipForm.id,//关系id
      relationshipName:updateForm.relationshipForm.relationshipName,//关系名称
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
}catch(error){
  console.log('error');
}
}
onMounted(() => {
loadRelationshipList();
})
</script>

<style lang="scss" scoped>

</style>