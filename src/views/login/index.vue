<template>
    <div id="main">
      <el-card class="box-card">
          <div style="color: #888; font-size: 30px;text-align: center;padding: 30px 0" >知识图谱</div>
          <el-form
          :model="loginForm"
          ref="loginFormRef"
          status-icon
          label-width="100px"
          class="demo-loginForm"
        >
          <el-form-item label="手机号" prop="userPhone">
            <el-input v-model.userPhone="loginForm.userPhone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input
              type="password"
              v-model.passWord="loginForm.passWord"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('loginFormRef')">提交</el-button>
          </el-form-item>
        </el-form>
        </el-card>
    </div>      
</template>

<script lang="ts" setup>
import router from '@/router';
import { ElMessage, FormInstance } from 'element-plus';
import { ref } from 'vue';
import { reactive } from 'vue-demi';
import { loginAPI } from '../../api/login';
const loginFormRef = ref<FormInstance>();
const loginForm = reactive({
          userPhone: '',
          passWord: '',
      });

const submitForm = async(loginFormRef:any) => {
    const res = await loginAPI({userPhone:'18804236200',passWord:'1234567'})
    if(res.data.code == '200'){
        router.push({ path: "/home", query: {} })
    }
}

</script>

<style lang="scss" scoped>

#main{
background: url("../../assets/loginbg.jpg"); 
background-repeat: no-repeat;
background-size: 100% 100%;
position: fixed;
height: 100%; //高
width: 100%; //宽
top: 0px; //缩短白边距离
left: 0px; //缩短白边距离
}
.box-card{
width: 40%;
margin: 120px auto; //居中
opacity:0.7; //设置透明度，0为完全透明，1为不透明，我这里用0.7
}
</style>