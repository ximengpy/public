// 电话正则校验
export const phoneRegExp = /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/;
// 邮箱正则校验
export const emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
// 小数位正则校验 最大位数8位 小数位数5位
export const decimalRegExp = /^(\-)?[1-9]\d{0,7}(\.\d{1,5})?$|^0(\.\d{1,5})?$/;
/** 6至20位字符验证 */
export const passwordRegExp = /^.{6,20}$/;
/** 6位数字验证 */
export const phoneCodeRegExp = /^\d{6}$/;
/** 4位字符验证 */
export const imageCodeRegExp = /^.{4}$/;
/** 简单身份证校验 15 or 18位  */
export const idCardRegExp = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;

export const validatePhone = function (rule, value, callback) {
  if (!value) {
    callback(new Error("请填写手机号码"));
  } else if (!phoneRegExp.test(value)) {
    callback("手机号码格式不正确");
  } else {
    callback();
  }
};

export const validateEmail = function (rule, value, callback) {
  if (!value) {
    return callback(new Error("请填写邮箱"));
  } else if (!emailRegExp.test(value)) {
    callback(new Error("邮箱格式不正确"));
  } else {
    callback();
  }
};

/**
 * 描述 正整数校验
 * @author luoyong
 * @date 2022-02-23
 * @param {Object} rule
 * @param {Number} value
 * @param {Function} callback
 * @param {Boolean} isEmptyAble = false 是否可为空
 * @returns {Function}
 */
export const validatePositiveNumber = function (
  rule,
  value,
  callback,
  isEmptyAble = false
) {
  if (value === 0) return callback();
  if (!value && isEmptyAble) { callback(); }
  if (!value && !isEmptyAble) return callback(new Error("请输入数字"));
  if (isNaN(Number(value))) {
    callback(new Error("数字格式不正确"));
  } else if (!/^(0|[1-9][0-9]*)$/.test(value)) {
    callback(new Error("请输入非负整数"));
  } else {
    callback();
  }
};

/**
 * 描述 校验非负数且大于最小值
 * @author luoyong
 * @date 2022-02-23
 * @param {Object} rule
 * @param {Number} value
 * @param {Function} callback
 * @param {Number} min = 1 最小值
 * @returns {Function}
 */
export const validateNumberByMin = function (rule, value, callback, min = 1) {
  if (Number(value) < 0) return callback(new Error(`请不要填写非负数`));
  else if (Number(value) < min)
    return callback(new Error(`请填写不小于${min}的数字`));
  else return validateNumber(rule, value, callback);
};

/**
 * 描述 校验非负数且小于最大值
 * @author luoyong
 * @date 2022-02-23
 * @param {Object} rule
 * @param {Number} value
 * @param {Function} callback
 * @param {Number} max = 100 最大值
 * @param {String} tip 提示语
 * @returns {Function}
 */
export const validateNumberByMax = function (
  rule,
  value,
  callback,
  max = 100,
  tip = ""
) {
  if (Number(value) < 0) return callback(new Error(`请不要填写非负数`));
  else if (Number(value) > max)
    return callback(new Error(tip || `请填写不大于${max}的数字`));
  else return validateNumber(rule, value, callback);
};

/**
 * 描述 数字最大位数及小数位数校验
 * @author luoyong
 * @date 2022-02-23
 * @param {Object} rule
 * @param {Number} value
 * @param {Function} callback
 * @param {Boolean} isEmptyAble = false 是否可为空
 * @returns {Function}
 */
export const validateNumber = function (
  rule,
  value,
  callback,
  isEmptyAble = false
) {
  if (value === 0) return callback();
  if (!value && isEmptyAble) { callback(); }
  if (!value && !isEmptyAble) return callback(new Error("请输入数字"));
  if (isNaN(Number(value)) || !decimalRegExp.test(value)) {
    callback(new Error("数字格式不正确"));
  } else {
    callback();
  }
};

/**
 * 简单身份证校验 15 or 18位
 * @author suguanhua
 * @date 2022-02-23
 * @param {Object} rule
 * @param {Number} value
 * @param {Function} callback
 * @param {Boolean} isEmptyAble = false 是否可为空
 */
export const validityIdCardEasy = function (
  rule,
  value,
  callback,
  isEmptyAble = false
) {
  if (!value && !isEmptyAble) {
    callback(new Error("请输入身份证号码"));
  } else if (!idCardRegExp.test(value)) {
    callback("身份证号码格式不正确");
  } else {
    callback();
  }
};

/**
 * 严格身份证校验  18位
 * @author suguanhua
 * @date 2022-02-23
 * @param {Object} rule
 * @param {Number} value
 * @param {Function} callback
 * @param {Boolean} isEmptyAble = false 是否可为空
 */
export const validityIdCardStrict = function (
  rule,
  value,
  callback,
  isEmptyAble = false
) {
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 ",
  };
  var tip = "";
  var pass = true;console.log(value,isEmptyAble)
  if (!value && isEmptyAble) {
     callback();
  } else if (!value && !isEmptyAble) {
    callback(new Error("请输入身份证号码"));
  }
  if (
    !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
      value
    )
  ) {
    tip = "身份证号码格式错误";
    pass = false;
  } else if (!city[value.substr(0, 2)]) {
    tip = "地址编码错误";
    pass = false;
  } else {
    // 18位身份证需要验证最后一位校验位
    if (value.length === 18) {
      value = value.split("");
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      // 校验位
      var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = value[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != value[17]) {
        tip = "校验位错误";
        pass = false;
      }
    }
  }
  if (!pass) {
    callback(new Error(tip));
  } else {
    callback();
  }
};
