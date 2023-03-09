<template>
  <div class="flex header-wrap">
    <div class="logo align-self-middle">投放平台</div>
    <div class="flex flex-auto justify-end align-middle">
      <el-dropdown trigger="click" class="flex dropdown align-middle" placement="bottom" @command="handleCommand">
        <span class="el-dropdown-link">
          <strong>{{ username }}</strong>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="changePass">修改密码</el-dropdown-item>
            <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CommonApi, getLoginUrl } from '@/api';
import { getLocalStorage } from '@/utils/storage';
import { ArrowDown } from '@element-plus/icons-vue';
import { USERINFO } from '@/assets/js/storage-keys';

const username = ref('Hello World');

const getUserName = () => {
  let userInfo = getLocalStorage(USERINFO, true);
  username.value = userInfo.username || 'Hello World';
};

const changePass = async () => {
  window.location.href = await getLoginUrl();
};
const loginout = async () => {
  CommonApi.logout();
  sessionStorage.clear();
  localStorage.removeItem(USERINFO);
  window.location.href = await getLoginUrl();
};
const handleCommand = (command: string) => {
  switch (command) {
    case 'changePass':
      changePass();
      break;
    case 'loginout':
      loginout();
      break;
    default:
      break;
  }
};

getUserName();
</script>

<style scoped>
.header-wrap {
  position: relative;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
  box-sizing: border-box;
  background-image: linear-gradient(to right, #2e87ff, #0857ff);
}
.logo {
  padding: 0 30px;
  text-align: center;
}
.dropdown {
  height: 100%;
  padding: 0 30px;
  color: #eee;
  user-select: none;
  /* background: #eee; */
}
.el-dropdown-link {
  cursor: pointer;
}
</style>
