import { ApiModule } from "./types"
import * as Types from "./types/tagManage"

export interface ApiModuleTagManage {
  addLabel<T = Types.AddLabel>(param: unknown): Promise<T>,
  listLabel<T = Types.ListLabel[]>(param?: unknown): Promise<T>,
  getSubProductList<T = Types.GetSubProductList>(param: unknown): Promise<T>,
  getSubtypeList<T = Types.GetSubtypeList>(param: unknown): Promise<T>,
}

export const TagManage: ApiModule[] = [{
  name: "addLabel",  //新增标签
  url: "/api/materialLabelInfo/addLabel"
}, {
  name: "listLabel",  //标签列表
  url: "/api/materialLabelInfo/listLabel"
}, {
  name: "getSubProductList",  //获取所有子产品标签
  url: "/api/materialLabelInfo/getSubProductList"
}, {
  name: "getSubtypeList",   //获取所有子类型标签
  url: "/api/materialLabelInfo/getSubtypeList"
}]

export default TagManage