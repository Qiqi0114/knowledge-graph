<template>
  <div class="container-bg">
    <!-- 侧边菜单 -->
  <div class="menu">
    <el-scrollbar style="width: 200px">
        <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical"
        text-color="#fff"
        router
        :collapse="isCollapse"
        :default-active="activesIndex"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu index="1">
          <template #title>
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/home/userManagement">用户管理</el-menu-item>
            <el-menu-item index="/home/roleManagement">角色管理</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <i class="el-icon-location"></i>
            <span>书籍词条</span>
          </template>
          <el-menu-item-group>
            <template #title>分组一</template>
            <el-menu-item index="/home/bookManagement">书籍管理</el-menu-item>
            <el-menu-item index="/home/entryManagement">词条服务</el-menu-item>
            <el-menu-item index="/home/relationshipManagement">词条服务</el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </el-menu>
      </el-scrollbar>
  </div>
  <div class="router-container" id="router-container">
    <!-- 头部 -->
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
  >
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-sub-menu index="2">
      <template #title>账号</template>
      <el-menu-item index="2-1" @click="goOut()">退出</el-menu-item>
    </el-sub-menu>
  </el-menu>
      <router-view></router-view>
  </div>
</div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";
import { ref } from "@vue/reactivity";
import { loginAPI } from "../../api/login";
import router from "@/router";
import store from "@/store";
const route = useRoute();
//头部默认选中
const activeIndex = ref<string>('1');
//退出
const goOut = async() => {
  router.push({ path: "/login", query: {} })
  await store.dispatch("clearLoginInfo");
}
//侧边菜单默认选中
const activesIndex = ref<string>('1');
//是否水平折叠收起菜单
const isCollapse = ref(false)


const handleOpen = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
// console.log(key, keyPath)
}

const test =()=>{
isCollapse.value = !isCollapse.value;
if (isCollapse.value===true){
document.getElementById("router-container")!.style.width="calc(100% - 63px)" ;
}else{
document.getElementById("router-container")!.style.width="calc(100% - 200px)" ;
}
}

</script>

<style lang="scss" scoped>
.menu{
  width: 200px;
  top: 0;
  bottom: 0;
  position: absolute;
  left: 0;
  bottom: 0px;
}
.el-menu-vertical {
  height: 100%;
  align-items: center;
  justify-content: center;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  margin: 0px;
}

.router-container{
  overflow: hidden;
  right: 0;
  width: 1000px;
  margin-bottom: 0px;
  height: 100%;
  z-index: 88;
}
.collapse-bg{
  padding:30px 0px 430px 25px;
  background: #545c64;
}
:deep(.el-scrollbar__view){
  height: 100%;
}
</style>