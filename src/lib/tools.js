export default {}

// 本地存储
export function localSave(key, value) {
  localStorage.setItem(key, value)
}

// 本地读入
export function localRead(key) {
  return localStorage.getItem(key) || []
}

// 移除缓存
export function localRemove(key) {
  localStorage.removeItem(key)
}

// 清空obj空key
export function trimObj(obj) {
  for (let key in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(key) &&
      (obj[key] === null || obj[key] === undefined) || obj[key] === '') {
      delete obj[key]
    }
  }
}

// 判断字符串是否为空
export function isEmptyStr(obj) {
  return typeof obj === "undefined" || obj === null || obj === ""
}