/**
 * 检测类型
 * @param {any} target 检测的目标
 * @returns {'string'|'number'|'array'|'object'|'function'|'null'|'undefined'|'regexp'} 只枚举一些常用的类型
 */
 export function checkType(target) {
  /** @type {string} */
  const value = Object.prototype.toString.call(target);
  const result = value.match(/\[object (\S*)\]/)[1];
  return result.toLocaleLowerCase();
}

/**
 * 修改属性值-只修改之前存在的值
 * @param {object} target 修改的目标
 * @param {object} value 修改的内容
 */
export function modifyData(target, value) {
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      // target[key] = value[key];
      // 需要的话，深层逐个赋值
      if (checkType(target[key]) === "object") {
        modifyData(target[key], value[key]);
      } else {
        target[key] = value[key];
      }
    }
  }
}

/**
 * 格式化日期
 * @param {string | number | Date} value 指定日期
 * @param {string} format 格式化的规则
 * @example
 * ```js
 * formatDate();
 * formatDate(1603264465956);
 * formatDate(1603264465956, 'h:m:s');
 * formatDate(1603264465956, 'Y-M-D');
 * formatDate(1603264465956, 'Y年-M月-D日');
 * ```
 */
export function formatDate(value = Date.now(), format = "Y-M-D h:m:s") {
  const formatNumber = (n) => `0${n}`.slice(-2);
  const date = new Date(value);
  const formatList = ["Y", "M", "D", "h", "m", "s"];
  const resultList = [];
  resultList.push(date.getFullYear().toString());
  resultList.push(formatNumber(date.getMonth() + 1));
  resultList.push(formatNumber(date.getDate()));
  resultList.push(formatNumber(date.getHours()));
  resultList.push(formatNumber(date.getMinutes()));
  resultList.push(formatNumber(date.getSeconds()));
  for (let i = 0; i < resultList.length; i++) {
    format = format.replace(formatList[i], resultList[i]);
  }
  return format;
}

/**
 * `JSON`转`FormData`
 * @param {{ [key: string]: number | string | boolean }} params `JSON`对象
 * @example
 * ```js
 * const info = { name: 'hjs', id: 123 };
 * const val = jsonToFormData(info);
 * console.log(val); // 'name=hjs&id=123'
 * ```
 */
export function jsonToFormData(params) {
  let result = "";
  for (const key in params) {
    result += `&${key}=${params[key]}`;
  }
  return result.slice(1);
}

/**
 * 复制文本
 * @param {string} text 复制的内容
 * @param {() => void} success 成功回调
 * @param {(tip: string) => void} fail 出错回调
 * @example
 * ```js
 * copyText(value, () => this.$message.success('复制成功'), tip => this.$message.warning(tip));
 * ```
 */
export function copyText(text, success = null, fail = null) {
  text = text.replace(/(^\s*)|(\s*$)/g, "");
  if (!text) {
    typeof fail === "function" && fail("复制的内容不能为空！");
    return;
  }
  const id = "the-clipboard";
  /**
   * 粘贴板节点
   * @type {HTMLTextAreaElement}
   */
  let clipboard = document.getElementById(id);
  if (!clipboard) {
    clipboard = document.createElement("textarea");
    clipboard.id = id;
    clipboard.readOnly = true;
    clipboard.style.cssText =
      "font-size: 15px; position: fixed; top: -1000%; left: -1000%;";
    document.body.appendChild(clipboard);
  }
  clipboard.value = text;
  clipboard.select();
  clipboard.setSelectionRange(0, text.length);
  const state = document.execCommand("copy");
  if (state) {
    typeof success === "function" && success();
  } else {
    typeof fail === "function" && fail("复制失败");
  }
}

/**
 * 插入脚本
 * @param {string} link 脚本路径
 * @param {Function} callback 脚本加载完成回调
 */
export function insertScript(link, callback) {
  const label = document.createElement("script");
  label.src = link;
  label.onload = function () {
    if (label.parentNode) label.parentNode.removeChild(label);
    if (typeof callback === "function") callback();
  };
  document.body.appendChild(label);
}

/**
 * 获取一些深层`key`的对象值
 * @param {object} target 目标对象
 * @param {string} key `key`字段
 * @example
 * ```js
 * const info = {
 *     list: [
 *         { value: 'hjs' }
 *     ]
 * }
 * getDeepLevelValue(info, 'list.0.value'); // => 'hjs'
 * ```
 */
export function getDeepLevelValue(target, key) {
  const keys = key.split(".");
  let result;
  for (let i = 0; i < keys.length; i++) {
    const prop = keys[i];
    result = target[prop];
    const type = checkType(result);
    if (type !== "object" && type !== "array") {
      break;
    } else {
      target = target[prop];
    }
  }
  return result;
}

/**
 * ES5 兼容 ES6 `Array.findIndex`
 * @param {Array<T>} array
 * @param {(value: T, index: number) => boolean} compare 对比函数
 */
export function findIndex(array, compare) {
  var result = -1;
  for (var i = 0; i < array.length; i++) {
    if (compare(array[i], i)) {
      result = i;
      break;
    }
  }
  return result;
}

/**
 * 自定义对象数组去重
 * @param {Array<T>} array
 * @param {(a: T, b: T) => void} compare 对比函数
 * @example
 * ```js
 * const list = [{ id: 10, code: 'abc' }, {id: 12, code: 'abc'}, {id: 12, code: 'abc'}];
 * filterRepeat(list, (a, b) => a.id == b.id)
 * ```
 */
export function filterRepeat(array, compare) {
  return array.filter((element, index, self) => {
    return findIndex(self, (el) => compare(el, element)) === index;
  });
}

/**
 * 打开链接
 * @param {string} link
 * @param {'_blank'|'_self'|'_parent'|'_top'} target
 */
export function openLink(link, target = "_blank") {
  const label = document.createElement("a");
  label.href = link;
  label.target = target;
  document.body.appendChild(label);
  label.click();
  document.body.removeChild(label);
}

/**
 * @param {String} text 富文本
 * @returns {String}
 */
export function formatRichText(text) {
  if (!text) return "";
  let re1 = new RegExp("<.+?>", "g");
  text = text.replace(re1, "");
  text = text.replace(/\n/g, "");
  text = text.replace(/&nbsp;/g, " ");
  return text;
}

/**
 * 输入只能是数字
 * @param {string | number} value 输入的值
 * @param {boolean} decimal 是否要保留小数
 * @param {boolean} negative 是否可以为负数
 */
export function inputOnlyNumber(value, decimal, negative) {
  let result = value.toString().trim();
  if (result.length === 0) return "";
  const minus = negative && result[0] == "-" ? "-" : "";
  if (decimal) {
    result = result.replace(/[^0-9.]+/gi, "");
    let array = result.split(".");
    if (array.length > 1) {
      result = array[0] + "." + array[1];
    }
  } else {
    result = result.replace(/[^0-9]+/gi, "");
  }
  return minus + result;
}

/**
 * 描述 用于onresize事件中绑定多个回调函数
 * @author luoyong
 * @date 2021-03-16
 * @param {Function} callback 回调函数
 * @returns {void}
 */
export function addEventOnResize(callback) {
  var originFn = window.onresize;
  window.onresize = function () {
    originFn && originFn();
    callback();
  };
}

// 过滤掉富文本里面包含的html标签和空格符等东西
/**
 *
 * @param {*} value  富文本
 * @returns  {String}
 */
export function fiterLabelHandle(value) {
  value = value.replace(/(\n)/g, ""); // 去掉换行
  value = value.replace(/(\t)/g, ""); // 去掉换行
  value = value.replace(/(\r)/g, "");
  value = value.replace(/<\/?[^>]*>/g, ""); // 去掉标签
  value = value.replace(/\s*/g, "");
  value = value.replace(/ /gi, " "); // 去掉
  return value;
}

/**
 * 数值转换
 * @param {string|number} num
 */
export function formatterNumber(num) {
  if (!num) return "0";
  const value = Number(num);
  let result = "";
  const k = 10000;
  const sizes = ["", "万", "亿", "万亿"];
  if (value < k) {
    result = value;
  } else {
    const i = Math.floor(Math.log(value) / Math.log(k));
    result = (value / Math.pow(k, i)).toFixed(2) + sizes[i];
  }
  return result;
}

/**
 * 导出文件
 * @param res {object} 响应信息 需要包含相应头的全部信息
 * @returns
 */
export function exportFile(res, filename) {
  const temp = res.headers["content-disposition"];
  const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
  const matchFilename = filenameRegex.exec(temp);
  filename = filename || (matchFilename && matchFilename[1]);
  const blob = res.data;
  // 将二进制流转为blob
  if (typeof window.navigator.msSaveBlob !== "undefined") {
    // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
    window.navigator.msSaveBlob(blob, decodeURI(filename));
  } else {
    // 创建新的URL并指向File对象或者Blob对象的地址
    const blobURL = window.URL.createObjectURL(new Blob([blob]));
    // 创建a标签，用于跳转至下载链接
    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", decodeURI(filename));
    // 兼容：某些浏览器不支持HTML5的download属性
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }
    // 挂载a标签
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    // 释放blob URL地址
    window.URL.revokeObjectURL(blobURL);
  }
}

/**
 * 一维数组转二维数组
 * @param data 一维数组
 * @param len 二维数组每个子数组长度
 * @param arr 保存的新数组(二维数组)
 */
export function change2Array(data, len, arr = []) {
  if (data.length <= len) {
    arr.push(data);
    return arr;
  } else {
    arr.push(data.splice(0, len));
    change2Array(data, len, arr);
  }
}

