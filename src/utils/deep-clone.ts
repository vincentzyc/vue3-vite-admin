import { isObject, isArray } from './validate/dataType';

type ObjectIndex = Record<string, any>;

/**
 * 对象深拷贝
 * @param {Object} obj 初始对象
 * @return {Object} 拷贝后对象
 */
export function deepClone(obj: ObjectIndex): ObjectIndex {
  let result: ObjectIndex = isArray(obj) ? [] : {};
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (obj[key] === undefined || obj[key] === null) continue;
      if (isObject(obj[key]) || isArray(obj[key])) {
        result[key] = deepClone(obj[key]);
      } else {
        result[key] = obj[key];
      }
    }
  }
  return result;
}
