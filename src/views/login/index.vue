<template>
    <div class="container">
    <div class="main">
        <!-- 整个注册盒子 -->
      <div class="loginbox">
          <!-- 左侧的注册盒子 -->
          <div class="loginbox-in"
          :model="loginForm"
          ref="loginFormRef">
          <div class="userbox"> 
           <span class="iconfont"><el-icon><User /></el-icon></span> 
           <input  class="user" id="user"   v-model.userPhone="loginForm.userPhone" placeholder="用户名">
           </div>
          <br>
          <div class="pwdbox">
            <span class="iconfont"><el-icon><Lock /></el-icon></span>
           <input  class="pwd"  id="password" v-model.passWord="loginForm.passWord" type="password"  placeholder="密码">
           </div>
          <br>
           <button class="register_btn"  @click="submitForm('loginFormRef')">登录</button>
     </div>
 
        <!-- 右侧的注册盒子 -->
         <div class="background">
            <div class="title">欢迎登录知识图谱管理后台</div>
        </div>

      </div>
    </div>
  </div>

</template>

<script lang="ts" setup>
import router from '@/router';
import store from '@/store';
import { ElMessage, FormInstance } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue';
import { reactive } from 'vue-demi';
import { loginAPI } from '../../api/login';
const loginFormRef = ref<FormInstance>();
const loginForm = reactive({
          userPhone: '',
          passWord: '',
      });

/* const submitForm = async(loginFormRef:any) => {
    const res = await loginAPI({userPhone:'18804236200',passWord:'123456'})
    if(res.data.code == '200'){
        router.push({ path: "/home", query: {} })
    }
} */
 const submitForm = async(loginFormRef:any) => {
  await store.dispatch("appLogin", {
                    ...loginForm});
}
</script>

<style lang="scss" scoped>
.container{
  background-image:url('../../assets/168502.webp');
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
.loginbox{
    display:flex;
    position:absolute;
    width:800px;
    height:400px;
    top:40%;
    left:50%;
    transform:translate(-50%,-50%);
    box-shadow: 0 12px 16px 0  rgba(0,0,0,0.24), 0 17px 50px 0 #4E655D;
}
.loginbox-in{
     background-color:#8dc9c9;
     width:240px;
}
.userbox{
    margin-top:120px ;
    height:30px;
     width:200px;
     display: flex;
     margin-left:25px;
}
.user{
  width: 160px;
}
.pwd{
  width: 160px;
}
.pwdbox{ 
    height:30px;
    width:200px;
    display: flex;
    margin-left:25px;
}

.background{
    width:570px;
    background-image:url('../../assets/loginphoto.webp');
    background-size:cover;
    font-family:sans-serif;
}
.title{
    margin-top:320px;
    font-weight:bold;
    font-size:20px;
    color:#7bbabe;
    
}
.title:hover{
     font-size:21px;
     transition: all 0.4s ease-in-out;
     cursor: pointer;
}
.uesr-text{
     position:left;
}
input{
    outline-style: none ;
    border: 0;
    border-bottom:1px solid #E9E9E9;
    background-color:transparent;
    height:20px;
     font-family:sans-serif;
    font-size:10px;
    color:#98fdff;
    font-weight:bold;
}
 /* input::-webkit-input-placeholder{
    color:#E9E9E9;
 } */
input:focus{
    border-bottom:2px solid #83bcb8;
    background-color:transparent;
     transition: all 0.2s ease-in;
     font-family:sans-serif;
    font-size:15px;
     color:#aefcff;
     font-weight:bold;
     
}
input:hover{
    border-bottom:2px solid #81d2d2;
    background-color:transparent;
     transition: all 0.2s ease-in;
     font-family:sans-serif;
    font-size:15px;
     color:#5dbab5;
     font-weight:bold;
     
}
 
input:-webkit-autofill {
  /* 修改默认背景框的颜色 */
 box-shadow: 0 0 0px 1000px  #7ec2c2 inset !important;
 /* 修改默认字体的颜色 */
 -webkit-text-fill-color: #445b5b;
} 

input:-webkit-autofill::first-line {
  /* 修改默认字体的大小 */
 font-size: 15px;
 /* 修改默认字体的样式 */
 font-weight:bold;
 }
.log-box{
    font-size:12px;
    display: flex;
    justify-content: space-between ;
    width:190px;
    margin-left:30px;
    color:#4E655D;
    margin-top:-5px;
    align-items: center;
   
}
.log-box-text{
    color:#4E655D;
    font-size:12px;
      text-decoration:underline;
    }
.login_btn{
    background-color: #5f8276; /* Green */
    border: none;
    color: #FAFAFA;
    padding: 5px 22px;
    text-align: center;
    text-decoration: none;
    font-size: 13px;
    border-radius: 20px;
    outline:none;
}
.login_btn:hover{
    box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
    cursor: pointer;
     background-color: #0b5137;
      transition: all 0.2s ease-in;
}

.register_btn{
    background-color:#6fb1af ;
    font-size: 12px;
    border-radius: 20px;  
     color:rgb(55, 121, 116);
    font-size:12px;
    display: flex;
    margin-left:100px;
}
.register_btn:hover{
    font-weight:bold;
    cursor: pointer;
}
.iconfont {
    font-family: "iconfont" !important;
    font-size: 20px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height:22px;
    color:#4E655D;
    margin-right:10px;
    margin-top:3px;
}
</style>