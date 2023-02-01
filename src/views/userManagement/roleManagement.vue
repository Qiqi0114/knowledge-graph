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
                                  <el-form-item label="角色名称" prop="roleName">
                                      <el-input v-model.roleName="searchForm.roleName"
                                         @input="loadRoleByPageInfoList()" placeholder="请输入名称" clearable/>
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
                  <el-table-column label="操作" min-width="40">
                      <template #default="scope">
                          <el-button type="success" link
                              @click="rolePutUserList(scope.row)">添加用户
                          </el-button>
                          <el-button type="danger" link @click="deleteRoleManagement(scope.row)">删除</el-button>
                      </template>
                  </el-table-column>
                  <el-table-column prop="id" label="角色id" min-width="130" />
                  <el-table-column prop="roleName" label="角色名称" min-width="120" />
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
          <!-- 添加角色信息对话框 -->
          <el-dialog title="添加角色" v-model="dialogAddFormVisible">
              <el-form :model="addForm">
                  <el-form-item label="角色名称">
                      <el-input v-model="addForm.userForm.roleName"></el-input>
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
          <!-- 角色下添加用户对话框 -->
          <el-dialog title="角色下添加用户" v-model="dialogFormVisible">
                <el-table highlight-current-row :data="addRolePutUserTable" height="300"
                    :header-cell-style="{ background: '#F5F6FA' }"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"> </el-table-column>
                    <el-table-column prop="id" label="用户id" min-width="130" />
                        <el-table-column prop="userName" label="用户全称" min-width="120" />
                        <el-table-column prop="passWord" label="密码" min-width="120" />
                        <el-table-column prop="userSex" label="用户性别" min-width="90" />
                        <el-table-column prop="userPhone" label="手机号" min-width="120" />
                        <el-table-column prop="userEmail" label="用户邮箱" min-width="120" />
                        <el-table-column prop="userStatic" label="用户状态" min-width="120">
                            <template #default="scope">
                                <span v-if="scope.row.userStatic">封禁</span>
                                <span v-if="!scope.row.userStatic">激活</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="roleId" label="角色id" min-width="85"/>
                </el-table>
              <template #footer>
                  <span class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="rolePutUserConfirm()"
                      >确 定</el-button
                  >
                  </span>
              </template>
          </el-dialog>
      </div>
  </div>
</template>

<script lang="ts" setup>
import { addRoleManagementAPI, addRolePutUserListAPI, deleteRoleManagementAPI, getRoleByPageAPI, getRoleListByUserIdAPI } from "@/api/roleManagement";
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
loadRoleByPageInfoList();
};
const handleCurrentChange = (val: number) => {
pCurrentPage.value = val;
loadRoleByPageInfoList();
};
const searchFormRef = ref<FormInstance>()
//查询参数
const searchForm = reactive({
    roleName:"",
})

//添加角色信息对话框开关
const dialogAddFormVisible = ref<boolean>(false);
const addForm = reactive({
userForm:{
    roleName:'',
}
});
//添加角色
const addConfirm = async() =>{
try{
  const res = await addRoleManagementAPI({
       roleName:addForm.userForm.roleName,
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
await loadRoleByPageInfoList()
}
//角色下添加用户对话框开关
const dialogFormVisible = ref<boolean>(false);
//用户列表绑定
const addRolePutUserTable = ref([]);
//声明类型
interface User {
    id:'',
    userName:'',
    userSex:'',
    userPhone:'',
    userEmail:'',
    userStatic:false,
    roleId:'',
}
//选中用户绑定
const addUserIdTable = ref<User[]>([]);
//表格勾选事件
const handleSelectionChange = (val: User[]) => {
    addUserIdTable.value = val;
}
//定义添加用户的角色id
const userId = ref<string>('');
//角色下添加用户
const rolePutUserList = async(row:any) =>{
dialogFormVisible.value = true;
userId.value = row.id;
await loadRoleListByUserId(row.id)
}

//确认角色下添加用户
const rolePutUserConfirm = async() =>{
await rolePutUserListById()
dialogFormVisible.value = false;
await loadRoleByPageInfoList()
}
//删除角色
const deleteRoleManagement = async(row:any) => {
ElMessageBox.confirm("确认删除?", {
  confirmButtonText: "是",
  cancelButtonText: "否",
  type: "warning",
})
  .then(async () => {
      //删除的过渡效果
      loading.value = true;
      const res = await deleteRoleManagementAPI({id:row.id});
      if (res.data.code == 200) {
          ElMessage({
              message: "删除成功",
              duration: 1500,
              type: "success",
          });
          loadRoleByPageInfoList();
      } else {
          ElMessage.error(res.data.msg)
      }
      loading.value = false;
  })
  .catch(() => {console.log('erroe');});
}

//获取列表
const loadRoleByPageInfoList = async () => {
loading.value = true;
try{
    const res = await getRoleByPageAPI({
         pageNum:pCurrentPage.value,
         pageSize:pPageSize.value,
         roleName:searchForm.roleName
    })
    baseInfoTableData.value = res.data.data.records;
    pTotal.value = res.data.data.total;
}catch(error){
    console.log('error');
}
loading.value = false;
}
//根据id获取用户信息 
const loadRoleListByUserId = async (id:string) => {
try{
  const res = await getRoleListByUserIdAPI({
      id:id,
  })
  addRolePutUserTable.value = res.data.data;
}catch(error){
  console.log('error');
  
}
}
//获取选中用户id集合
const selectUserIdList = ref<any>([]);
//角色下添加用户
const rolePutUserListById = async () => {
try{
    for(let i = 0; i < addUserIdTable.value.length; i++){
        selectUserIdList.value.push(addUserIdTable.value[i].id)
    }
  const res = await addRolePutUserListAPI({
      roleId:userId.value,//角色id
      userIdList:selectUserIdList.value,//用户id集合
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
userId.value = '';
}
onMounted(() => {
loadRoleByPageInfoList();
})
</script>

<style lang="scss" scoped>

</style>