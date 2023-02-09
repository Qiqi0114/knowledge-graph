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
                        <el-table-column label="操作" min-width="90">
                            <template #default="scope">
                                <el-button type="primary" link @click="seeTask(scope.row)">查看任务</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="id" label="用户id" min-width="130" :show-overflow-tooltip="true"/>
                        <el-table-column prop="userName" label="用户全称" min-width="120" />
                        <el-table-column prop="passWord" label="密码" min-width="120" :show-overflow-tooltip="true"/>
                        <el-table-column prop="userSex" label="用户性别" min-width="90" />
                        <el-table-column prop="userPhone" label="手机号" min-width="150" />
                        <el-table-column prop="userEmail" label="用户邮箱" min-width="180" />
                        <el-table-column prop="userStatic" label="用户状态" min-width="90">
                            <template #default="scope">
                                <span v-if="scope.row.userStatic">激活</span>
                                <span v-if="scope.row.userStatic">封禁</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="roleId" label="角色id" min-width="120" :show-overflow-tooltip="true"/>
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


                <!-- 查看任务对话框 -->
                <el-dialog title="分配任务" v-model="dialogFormVisible">
                    <el-table :data="taskByIdTableData" :border="true" 
                        ref="taskByIdTableDataRef" v-loading="loading" :header-cell-style="{ background: '#F5F6FA' }"
                        :height="250">
                        <el-table-column prop="id" label="id" min-width="180" :show-overflow-tooltip="true"/>
                        <el-table-column prop="taskCreateTime" label="任务创建时间" min-width="200" />
                        <el-table-column prop="taskLoadTime" label="任务结束时间" min-width="200" />
                        <el-table-column prop="userName" label="人员" min-width="120" />
                        <el-table-column prop="bookName" fixed="left" label="书籍名称" min-width="300" :show-overflow-tooltip="true"/>
                        <el-table-column prop="directoryName" label="章节名称" min-width="300" :show-overflow-tooltip="true"/>
                        <el-table-column prop="staticZ" fixed="right" label="状态" min-width="70">
                            <template #default="scope">
                                <span v-if="scope.row.staticZ === 1">未完成</span>
                                <span v-if="scope.row.staticZ === 2">已完成</span>
                                <span v-if="scope.row.staticZ === 3">超市</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-form :model="updateForm">
                        <el-row>
                            <el-col :span="24">
                                &nbsp;
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item label="用户id">
                                    <el-input v-model="updateForm.assignForm.userId" style="width:250px"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
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
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <el-form-item>
                                    <el-button type="primary" @click="seeBookList()">选择书籍</el-button>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="书籍id">
                                    <el-input v-model="updateForm.assignForm.bookId" style="width:250px"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="章节id">
                                    <el-input v-model="updateForm.assignForm.directoryId" style="width:250px"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form>
                    <template #footer>
                        <span class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="updateConfirm()"
                            >确认分配</el-button
                        >
                        </span>
                    </template>
                </el-dialog>
                <!-- 查看任务对话框 -->
                <el-dialog title="选择书籍" v-model="dialogbookVisible">
                    <el-table :data="bookTableData" :border="true" 
                        ref="bookTableDataRef" v-loading="loading" :header-cell-style="{ background: '#F5F6FA' }"
                        @row-click="seeDirectoryList" :height="250">
                        <el-table-column prop="id" label="书籍id" min-width="180" :show-overflow-tooltip="true"/>
                        <el-table-column prop="bookName" fixed="left" label="书籍名称" min-width="300" :show-overflow-tooltip="true"/>
                        <el-table-column prop="bookStatic" fixed="书籍状态" label="状态" min-width="70">
                            <template #default="scope">
                                <span v-if="scope.row.bookStatic">正常</span>
                                <span v-if="!scope.row.bookStatic">禁用</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="createTime" label="创建时间" min-width="200" />
                        <el-table-column prop="createUser" label="创建人员" min-width="90" />
                        <el-table-column prop="updateTime" label="更新时间" min-width="200" />
                        <el-table-column prop="updateUser" label="更新人员" min-width="90" :show-overflow-tooltip="true"/>
                    </el-table>
                </el-dialog>
                <!-- 查看章节对话框 -->
                <el-dialog title="选择章节" v-model="dialogdirectoryVisible">
                    <el-table :data="directoryTableData" :border="true" 
                        ref="directoryTableDataRef" v-loading="loading" :header-cell-style="{ background: '#F5F6FA' }"
                        @row-click="directoryConfirm" :height="250">
                        <el-table-column prop="id" label="id" min-width="180" :show-overflow-tooltip="true"/>
                        <el-table-column prop="directoryName" label="章节名称" min-width="200" />
                        <el-table-column prop="bookId" v-if="false" label="书籍id" min-width="200" />
                    </el-table>
                </el-dialog>
            </div>
        </div>
</template>

<script lang="ts" setup>
import { allocationTaskAPI, getBooKListAPI, getDirectoryListAPI, getTaskUserByIdAPI } from "@/api/taskAssignmentManagement";
import { UserManagementAPI } from "@/api/userManagement";
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
     userName:"",
})
//任务赋值
const taskByIdTableData = ref<any[]>([]);
//分配任务对话框开关
const dialogFormVisible = ref<boolean>(false);
const updateForm = reactive({
    assignForm:{
      //创建时间
      taskCreateTime:'',
      taskLoadTime:'',
      //用户id
      userId:'',
      //书籍id
      bookId:'',
      //章节id
      directoryId:'',
    }
});
//时间赋值
const value1 = ref('')
const size = ref<'default' | 'large' | 'small'>('default')
//分配任务
const seeTask = async(row:any) =>{
    dialogFormVisible.value = true;
    updateForm.assignForm.taskCreateTime = '';
    updateForm.assignForm.taskLoadTime = '';
    updateForm.assignForm.userId = '';
    updateForm.assignForm.bookId = '';
    updateForm.assignForm.directoryId = '';
    value1.value = '';
    await loadTaskUserById(row.id)
    updateForm.assignForm.userId = row.id;
}
//书籍赋值
const bookTableData = ref<any[]>([]);
//选择书籍开关
const dialogbookVisible = ref<boolean>(false);
const seeBookList = async() => {
    dialogbookVisible.value = true;
    loadBooKList();
}
//获取书籍列表
const loadBooKList = async() => {
    loading.value = true;
    try{
        const res = await getBooKListAPI()
        bookTableData.value = res.data.data;
    }catch(error){

    }
    loading.value = false;
}
//章节赋值
const directoryTableData = ref<any[]>([]);
//选择章节开关
const dialogdirectoryVisible = ref<boolean>(false);
//  taskCreateTime taskLoadTime bookId 参数令名
const bookId = ref<string>('');
//选中某行事件
const seeDirectoryList = async(row:any) => {
    dialogdirectoryVisible.value = true;
    await loadDirectoryList(row);
    bookId.value = row.id;
}
//获取章节列表
const loadDirectoryList = async(row:any) => {
    loading.value = true;
    try{
        const res = await getDirectoryListAPI({
            id:row.id
        })
        directoryTableData.value = res.data.data;
    }catch(error){

    }
    loading.value = false;
}
//确认选择章节
const directoryConfirm = async(row:any) => {
    ElMessageBox.confirm("确认选择此章节?", {
        confirmButtonText: "是",
        cancelButtonText: "否",
        type: "warning",
    })
        .then(async () => {
            updateForm.assignForm.bookId = bookId.value;
            updateForm.assignForm.directoryId = row.id;
            dialogdirectoryVisible.value = false;
            dialogbookVisible.value = false;
        })
        .catch(() => {console.log('error');});
}
//确认分配任务
const updateConfirm = async() =>{
    updateForm.assignForm.taskCreateTime = value1.value[0];
    updateForm.assignForm.taskLoadTime = value1.value[1];
    await updateAllocationTask()
    dialogFormVisible.value = false;
    await loadUserManagementInfoList()   
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
//获取单个用户的任务 
const loadTaskUserById = async (id:string) => {
    try{
        const res = await getTaskUserByIdAPI({
            id:id,
        })
        taskByIdTableData.value = res.data.data;
    }catch(error){
        console.log('error');
        
    }
}

//分配任务
const updateAllocationTask = async () => {
    try{
        const res = await allocationTaskAPI({
            taskCreateTime:updateForm.assignForm.taskCreateTime,
            taskLoadTime:updateForm.assignForm.taskLoadTime,
            userId:updateForm.assignForm.userId,
            bookId:updateForm.assignForm.bookId,
            directoryId:updateForm.assignForm.directoryId,
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
    updateForm.assignForm.taskCreateTime = '';
    updateForm.assignForm.taskLoadTime = '';
    updateForm.assignForm.userId = '';
    updateForm.assignForm.bookId = '';
    updateForm.assignForm.directoryId = '';
    value1.value = '';
}
onMounted(() => {
    loadUserManagementInfoList();
})
</script>

<style lang="scss" scoped>

</style>