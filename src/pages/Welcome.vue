<template>
  <div class="welcome-wrap" style="height: 100%">
    <img src="@/assets/img/logo.png" alt="logo" class="junbo-logo" />
    <span class="junbo-value">创造价值 分享价值</span>
    <div class="welcome-text" v-html="text"></div>
    <img src="@/assets/img/welcome.jpg" alt="欢迎" style="width: 100%" />
  </div>
</template>

<script setup lang="ts">
import { USERINFO } from '@/assets/js/storage-keys';
import { getLocalStorage, getSessionStorage } from '@/utils/storage';
import { ref, onMounted } from 'vue';

const text = ref('');
const userInfo = ref<null | Record<string, any>>(null);

let localUserInfo = getLocalStorage(USERINFO, true);
localUserInfo ? (userInfo.value = localUserInfo) : '';

let backUrl = getSessionStorage('backUrl');
if (backUrl) {
  sessionStorage.removeItem('backUrl');
  window.location.href = backUrl;
}

onMounted(() => {
  if (userInfo.value?.crmMenus) {
    if (Array.isArray(userInfo.value.crmMenus) && userInfo.value?.crmMenus.length > 0) {
      return (text.value = `<h1 style="font-size:30px">您好，${userInfo.value?.username}</h1><h2 class="mg-t20" style="font-size:30px">欢迎使用骏伯投放平台</h2>`);
    }
  } else {
    return (text.value = `<h1 style="font-size:30px">对不起，${userInfo.value?.username}</h1><h2 class="mg-t20" style="font-size:30px">您还没有任何权限，请联系管理员开通</h2>`);
  }
});
</script>
