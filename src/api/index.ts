import { ApiModule } from './types';
import { Common, ApiModuleCommon } from './common';
import { TagManage, ApiModuleTagManage } from './tagManage';
import Axios from '@/plugins/axios';
import { ElMessageBox } from 'element-plus';
import { closeLoading } from '@/utils/loading';
import { setSessionStorage } from '@/utils/storage';
import { USERINFO } from '@/assets/js/storage-keys';

let loginUrl = '';

const createInterface = (arr: ApiModule[]) => {
  const Interface: Record<string, any> = {};
  arr.forEach(v => {
    Interface[v.name] = (param: unknown, config: Record<string, any>) => {
      return new Promise((resolve, reject) => {
        if (v.type === 'get') {
          axiosGet({
            url: v.url + param,
            getAllData: v.getAllData,
            ...config,
          }).then(res => resolve(res));
        } else {
          axiosPost({
            url: v.url,
            data: param,
            getAllData: v.getAllData,
            getError: v.getError,
            ...config,
          })
            .then(res => resolve(res))
            .catch(error => reject(error));
        }
      });
    };
  });
  return Interface;
};

export const CommonApi = createInterface(Common) as ApiModuleCommon;
export const TagManageApi = createInterface(TagManage) as ApiModuleTagManage;

export function env() {
  if (process.env.NODE_ENV === 'development') return 'development';
  if (window.location.href.includes('test-')) return 'test';
  return 'production';
}

export async function getLoginUrl() {
  if (loginUrl) return loginUrl;
  const res = await CommonApi.checkToken('?token=666'); //随便传一个token获取登录链接
  // loginUrl = res.data.includes('auto=') ? res.data : res.data + res.data.includes('?') ? '&auto=1' : '?auto=1';
  loginUrl = res.data;
  return loginUrl;
}

function formatBackData(res: Record<string, any>, getAllData: boolean) {
  if (res.status !== 200) {
    console.log(res);
    closeLoading();
    ElMessageBox.alert(res.statusText || '网络繁忙');
    return;
  }
  const result = res.data;
  if (getAllData) return result;
  switch (result.code) {
    case '0': //  成功
      return result.data;
    case '0000': //  成功
      return result.data;
    case '000004': // 用户尚未登录
      ElMessageBox.alert(result.message, {
        showClose: false,
        callback: async () => {
          setSessionStorage('backUrl', window.location.href);
          ElMessageBox.close();
          window.localStorage.removeItem(USERINFO);
          window.location.href = await getLoginUrl();
        },
      });
      closeLoading();
      return 'error';
    default: // 失败
      ElMessageBox.alert(result.message || result.msg || '服务器繁忙');
      return 'error';
  }
}

export function axiosPost(config: Record<string, any>) {
  return new Promise((resolve, reject) => {
    Axios.post(config.url, config.data, config)
      .then(res => {
        const backData = formatBackData(res, config.getAllData);
        if (backData === 'error') return closeLoading();
        resolve(backData);
      })
      .catch(error => {
        console.log(error);
        if (config.getError) {
          reject(error);
          return;
        }
        closeLoading();
        ElMessageBox.alert('网络繁忙');
      });
  });
}

export function axiosGet(config: Record<string, any>) {
  return new Promise((resolve, reject) => {
    Axios.get(config.url)
      .then(res => {
        const backData = formatBackData(res, config.getAllData);
        if (backData === 'error') return closeLoading();
        resolve(backData);
      })
      .catch(error => {
        console.log(error);
        if (config.getError) {
          reject(error);
          return;
        }
        closeLoading();
        ElMessageBox.alert('网络繁忙');
      });
  });
}

/**
 * get请求数据导出
 * @param {String} url 导出路径
 * @param {Object} data  导出参数
 */
export function exportDataGet(url: string, data: Record<string, any>) {
  if (typeof data !== 'object') {
    console.warn('导出参数错误');
    return;
  }
  let queryData = '',
    downloadUrl = '';
  for (const [key, value] of Object.entries(data)) {
    if (key === 'sessionId') break;
    queryData += `${key}=${value}&`;
  }
  downloadUrl = url + '?' + queryData.slice(0, -1);
  window.location.href = downloadUrl;
}
/**
 * post请求数据导出
 * @param {String} url 导出路径
 * @param {Object} data  导出参数
 */
export function exportDataPost(config: ApiModule) {
  Axios.post(config.url, config.data, { responseType: 'blob' }).then((res: any) => {
    if (res.status === 200 && res.data.type !== 'application/json') {
      const aLink = document.createElement('a');
      const blob = new Blob([res.data]);
      aLink.href = URL.createObjectURL(blob);
      aLink.download = config.name;
      aLink.style.display = 'none';
      document.body.appendChild(aLink);
      aLink.click();
      URL.revokeObjectURL(aLink.href);
      document.body.removeChild(aLink);
    } else {
      const reader = new FileReader();
      reader.readAsText(res.data, 'utf-8');
      reader.onload = () => {
        if (typeof reader.result === 'string') res.data = JSON.parse(reader.result);
        formatBackData(res, config.getAllData || false);
      };
    }
  });
}
