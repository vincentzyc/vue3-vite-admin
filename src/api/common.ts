import { ApiModule } from './types';
import * as Types from './types/common';

export interface ApiModuleCommon {
  checkToken<T = Types.CheckToken>(param: unknown): Promise<T>;
  logout<T = Types.Logout>(param?: unknown): Promise<T>;
  getSideBar<T = Types.GetSideBar>(param: unknown): Promise<T>;
}

export const Common: ApiModule[] = [
  {
    name: 'checkToken',
    url: '/api/sso/login',
    type: 'get',
    getAllData: true,
  },
  {
    name: 'logout', //退出登录
    url: '/api/user/logout',
    getAllData: true,
  },
  {
    name: 'getSideBar', //获取侧边栏菜单
    url: '/api/user/menu',
  },
];

export default Common;
