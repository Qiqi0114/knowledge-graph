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
                                        <el-form-item label="姓名" prop="userName">
                                            <el-input v-model.userName="searchForm.userName"
                                               @input="loadUserManagementInfoList()" placeholder="请输入姓名" clearable/>
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item style="float: right;">
                                            <el-button type="primary" @click="addUserManagement()">添加</el-button>
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
                        <el-table-column label="操作" fixed="left" min-width="110">
                            <template #default="scope">
                                <el-button type="primary" link
                                    @click="updateUserManagement(scope.row)">编辑
                                </el-button>
                                <el-button type="danger" link @click="deleteUserManagement(scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="id" label="用户id" min-width="130" :show-overflow-tooltip="true"/>
                        <el-table-column prop="userName" label="用户全称" min-width="120" />
                        <el-table-column prop="passWord" label="密码" min-width="120" :show-overflow-tooltip="true"/>
                        <el-table-column prop="userSex" label="用户性别" min-width="90" />
                        <el-table-column prop="userPhone" label="手机号" min-width="150" :show-overflow-tooltip="true"/>
                        <el-table-column prop="userEmail" label="用户邮箱" min-width="180" :show-overflow-tooltip="true"/>
                        <el-table-column prop="userStatic" label="用户状态" min-width="120">
                            <template #default="scope">
                                <el-button type="text" :disabled="scope.row.userStatic ? true : false"
                                    @click="updateActivationStatus(scope.row,false)">激活</el-button>
                                <el-button type="text" :disabled="scope.row.userStatic ? false : true"
                                    @click="updateActivationStatus(scope.row,true)">封禁</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="roleId" v-if="false" label="角色id" min-width="85" :show-overflow-tooltip="true"/>
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
                <!-- 添加用户信息对话框 -->
                <el-dialog title="添加用户" v-model="dialogAddFormVisible">
                    <el-form :model="addForm">
                        <el-form-item label="用户名称">
                            <el-input v-model="addForm.userForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="addForm.userForm.userSex">
                            <el-radio label="男">男</el-radio>
                            <el-radio label="女">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="电话">
                            <el-input v-model="addForm.userForm.userPhone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="addForm.userForm.userEmail"></el-input>
                        </el-form-item>
                        <el-form-item label="用户状态">
                            <el-switch v-model="addForm.userForm.userStatic"></el-switch>
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
                <!-- 修改用户信息对话框 -->
                <el-dialog title="修改用户" v-model="dialogFormVisible">
                    <el-form :model="updateForm">
                        <el-form-item label="用户id">
                            <el-input v-model="updateForm.userForm.id"></el-input>
                        </el-form-item>
                        <el-form-item label="用户名称">
                            <el-input v-model="updateForm.userForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                            <el-radio-group v-model="updateForm.userForm.userSex">
                            <el-radio label="男">男</el-radio>
                            <el-radio label="女">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="电话">
                            <el-input v-model="updateForm.userForm.userPhone"></el-input>
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="updateForm.userForm.userEmail"></el-input>
                        </el-form-item>
                        <el-form-item label="用户状态">
                            <el-switch v-model="updateForm.userForm.userStatic"></el-switch>
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
import { reactive } from "@vue/reactivity";
import { ElMessage, ElMessageBox, FormInstance } from "element-plus";
import { onMounted, ref } from "vue";
import { addUserManagementAPI, deleteUserManagementAPI, getUserActivationStatusAPI, getUserManagementAPI, updateUserManagementAPI, UserManagementAPI } from "../../api/userManagement";
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
     userName:"",
})

//添加用户信息
const addUserManagement = async() =>{
    dialogAddFormVisible.value = true;
}
//添加用户信息对话框开关
const dialogAddFormVisible = ref<boolean>(false);
const addForm = reactive({
    userForm:{
        id:'',
        userName:'',
        userSex:'',
        userPhone:'',
        userEmail:'',
        userStatic:false,
    }
});
//添加用户
const addConfirm = async() =>{
    try{
        const res = await addUserManagementAPI({
            userName:addForm.userForm.userName,
            userSex:addForm.userForm.userSex,
            userPhone:addForm.userForm.userPhone,
            userEmail:addForm.userForm.userEmail,
            userStatic:addForm.userForm.userStatic,
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
    await loadUserManagementInfoList()
}
//修改用户信息对话框开关
const dialogFormVisible = ref<boolean>(false);
const updateForm = reactive({
    userForm:{
        id:'',
        userName:'',
        userSex:'',
        userPhone:'',
        userEmail:'',
        userStatic:false,
    }
});
//编辑用户信息
const updateUserManagement = async(row:any) =>{
    dialogFormVisible.value = true;
    await loadUserManagementById(row.id)
}
//确认修改用户信息
const updateConfirm = async() =>{
    await updateUserManagementById()
    dialogFormVisible.value = false;
    await loadUserManagementInfoList()
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
            const res = await deleteUserManagementAPI({id:row.id});
            if (res.data.code == 200) {
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
        .catch(() => {console.log('error');});
}
//激活封禁用户状态 getUserActivationStatusAPI
const updateActivationStatus = async(row:any,type:boolean) => {
    loading.value = true;
    try{
        const res = await getUserActivationStatusAPI({
            id:row.id,
            userStatic:type
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
    }catch(error){}
    loading.value = false;
    loadUserManagementInfoList();
}
//获取列表
const loadUserManagementInfoList = async () => {
     loading.value = true;
     try{
          const res = await UserManagementAPI({
               pageNum:pCurrentPage.value,
               pageSize:pPageSize.value,
               userName:searchForm.userName
          })
          baseInfoTableData.value = res.data.data.records;
          pTotal.value = res.data.data.total;
     }catch(error){
          console.log('error');
     }
     loading.value = false;
}
//根据id获取用户信息 getUserManagementAPI
const loadUserManagementById = async (id:string) => {
    try{
        const res = await getUserManagementAPI({
            id:id,
        })
        updateForm.userForm = res.data.data;
    }catch(error){
        console.log('error');
        
    }
}
//修改用户信息 updateUserManagementAPI
const updateUserManagementById = async () => {
    try{
        const res = await updateUserManagementAPI({
            id:updateForm.userForm.id,//用户id
            userName:updateForm.userForm.userName,//用户名称
            userSex:updateForm.userForm.userSex,//性别
            userPhone:updateForm.userForm.userPhone,//电话
            userEmail:updateForm.userForm.userEmail,//邮箱
            userStatic:updateForm.userForm.userStatic,//用户状态
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
    loadUserManagementInfoList();
})
</script>

<style lang="scss" scoped>

</style>