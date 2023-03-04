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
                                  <el-form-item label="词条名称" prop="entryName">
                                      <el-input v-model.entryName="searchForm.entryName"
                                        @input="loadEntryListPage()"  placeholder="请输入词条名称" clearable/>
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
                  <el-table-column fixed="left" label="操作" min-width="70">
                      <template #default="scope">
                          <el-button type="danger" link @click="deleteEntry(scope.row)">删除</el-button>
                      </template>
                  </el-table-column>
                  <el-table-column prop="id" label="用户id" min-width="130" :show-overflow-tooltip="true"/>
                  <el-table-column prop="entryName" label="词条名称" min-width="120" />
                  <el-table-column prop="entryText" label="词条角色" min-width="120" />
                  <el-table-column prop="userName" label="创建人" min-width="120" />
                  <el-table-column prop="entryTime" label="创建时间" min-width="120" :show-overflow-tooltip="true"/>
                  <el-table-column prop="bookName" label="来源书籍" min-width="200" :show-overflow-tooltip="true"/>
                  <el-table-column prop="parentId" label="父id" min-width="120" :show-overflow-tooltip="true"/>
                  <el-table-column prop="relationshipName" label="关系" min-width="120" />
                  <el-table-column fixed="right" label="关系树" min-width="120">
                      <template #default="scope">
                          <el-button type="primary" link @click="seeEntryTreeList(scope.row)">查看关系树</el-button>
                      </template>
                  </el-table-column>
              </el-table>
            <!--分页器 start-->
            <div class="flex pagination-bg">
                <el-pagination v-model:currentPage="pCurrentPage" v-model:page-size="pPageSize"
                    :page-sizes="[10, 20]" :small="pSmall" :disabled="pDisabled" :background="pBackground"
                    layout="total, sizes, prev, pager, next, jumper" :total="pTotal" @size-change="handleSizeChange"
                    @current-change="handleCurrentChange" />
            </div>
            <!--分页器 end-->              
          </div>
                <!-- 查看节点下的所属关系树对话框 -->
                <el-dialog title="查看所属关系树" v-model="dialogTreeVisible">
                    <el-table :data="InfoTreeTableData" :border="true" ref="InfoTreeTableDataRef" v-loading="loading" 
                  :header-cell-style="{ background: '#F5F6FA' }" :height="300"
                  row-key="id" lazy  default-expand-all :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
                        <el-table-column prop="id" label="用户id" min-width="130" :show-overflow-tooltip="true"/>
                        <el-table-column prop="entryName" label="词条名称" min-width="120" />
                        <el-table-column prop="entryText" label="词条角色" min-width="120" />
                        <el-table-column prop="entryTime" label="创建时间" min-width="120" :show-overflow-tooltip="true"/>
                        <el-table-column prop="parentId" label="父id" min-width="120" :show-overflow-tooltip="true"/>
                        <el-table-column prop="relationshipId" label="关系" min-width="120" />
                    </el-table>
                </el-dialog>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "@vue/reactivity";
import { ElMessage, ElMessageBox, FormInstance } from "element-plus";
import { onMounted, ref } from "vue";
import { deleteEntryAPI, getEntryListPageAPI, getEntryTreeListAPI } from "@/api/entryManagement";

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
loadEntryListPage();
};
const handleCurrentChange = (val: number) => {
pCurrentPage.value = val;
loadEntryListPage();
};
const searchFormRef = ref<FormInstance>()
//查询参数
const searchForm = reactive({
entryName:"",
})

//删除词条
const deleteEntry = async(row:any) => {
ElMessageBox.confirm("确认删除?", {
  confirmButtonText: "是",
  cancelButtonText: "否",
  type: "warning",
})
  .then(async () => {
      //删除的过渡效果
      loading.value = true;
      const res = await deleteEntryAPI({id:row.id});
      if (res.data.code == 200) {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
          loadEntryListPage();
      } else {
          ElMessage.error(res.data.msg)
      }
      loading.value = false;
  })
  .catch(() => {console.log('error');});
}

//查看关系树弹窗开关
const dialogTreeVisible = ref<boolean>(false);
//treetable 赋值
const InfoTreeTableData = ref<User[]>([]);

interface User {
  id: string
  entryName: string
  entryText: string
  entryTime: string
  parentId: string
  relationshipId:string
  children?: User[]
}
//查看词条下的所属关系
const seeEntryTreeList = async(row:any) => {
dialogTreeVisible.value = true;
loading.value = true;
try{
  const res = await getEntryTreeListAPI({
      id:row.id,
      parentId:row.parentId
  })
  if (res.data.code == 200) {
    InfoTreeTableData.value = res.data.data;
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
const loadEntryListPage = async () => {
loading.value = true;
try{
    const res = await getEntryListPageAPI({
         pageNum:pCurrentPage.value,
         pageSize:pPageSize.value,
         entryName:searchForm.entryName
    })
    baseInfoTableData.value = res.data.data.records;
    pTotal.value = res.data.data.total;
}catch(error){
    console.log('error');
}
loading.value = false;
}


onMounted(() => {
loadEntryListPage();
})
</script>

<style lang="scss" scoped>
@import "../../style/public.scss";
</style>