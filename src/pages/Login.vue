<template>
  <div class="login-wrap"></div>
</template>

<script setup lang="ts">
import { CommonApi, getLoginUrl } from '@/api';
import { USERINFO } from '@/assets/js/storage-keys';
import { getUrlParam } from '@/utils';
import { closeLoading, openLoading } from '@/utils/loading';
import { getSessionStorage, setLocalStorage } from '@/utils/storage';

const getUserInfo = async (token: string) => {
  openLoading();
  let res = await CommonApi.checkToken('?token=' + token);
  let crmMenus = await CommonApi.getSideBar({ userId: res.id });
  let userInfo = {
    crmMenus: crmMenus,
    ...res.data,
  };
  setLocalStorage(USERINFO, userInfo, true);
  closeLoading();
  let backUrl = getSessionStorage('backUrl');
  if (backUrl) {
    sessionStorage.removeItem('backUrl');
    window.location.href = backUrl;
    return;
  }
  window.location.href = window.location.origin + window.location.pathname;
};

const token = getUrlParam('token');
if (token) {
  getUserInfo(token);
} else {
  window.location.href = await getLoginUrl();
}
</script>
