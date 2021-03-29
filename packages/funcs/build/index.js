import { stringify } from 'qs';

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it;

  if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = o[Symbol.iterator]();
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function goToUrl(router) {
  var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (JSON.stringify(payload) === '{}') {
    window.location.href = "http://".concat(window.location.host).concat(router);
  } else {
    window.location.href = "http://".concat(window.location.host).concat(router, "?").concat(stringify(payload));
  }
} // 获取URL上面的参数，如果没有返回null，有参数则返回对象

function getUrlParams() {
  var str = window.location.search;

  if (str !== '' && str && str.length > 0) {
    var newstr = str.substring(1);
    var arr = newstr.split('&');
    var payload = {};
    arr.forEach(function (v) {
      var param = v.split('=');
      payload[param[0]] = window.decodeURIComponent(param[1]);
    });
    return payload;
  }

  return null;
}

function goToUrlByKey(router) {
  var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var key = getCurrentUrl(router);

  if (key) {
    payload.key = key;
  }

  if (JSON.stringify(payload) === '{}') {
    window.location.href = "http://".concat(window.location.host).concat(router);
  } else {
    window.location.href = "http://".concat(window.location.host).concat(router, "?").concat(stringify(payload));
  }
} // 当前页URL跳转，参数放在sessionStorage上面，无加密

function goToUrlAndSaveBykey(router) {
  var name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var payload = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var data = JSON.stringify(payload);

  if (data !== '{}' && name) {
    sessionStorage.setItem(name, data);
  } else if (data === '{}' && name) {
    sessionStorage.removeItem(name);
  }

  var key = getCurrentUrl(router);

  if (key) {
    payload.key = key;
  }

  window.location.href = "http://".concat(window.location.host).concat(router, "?").concat(stringify(payload));
} // 新建标签页URL跳转，参数放在URL上面，无加密

function openNewUrlByKey(router) {
  var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var key = getCurrentUrl(router);

  if (key) {
    payload.key = key;
  }

  if (JSON.stringify(payload) === '{}') {
    window.open("http://".concat(window.location.host).concat(router));
  } else {
    window.open("http://".concat(window.location.host).concat(router, "?").concat(stringify(payload)));
  }
} // 根据传入的url去计算到底应该跳转到哪个页面

function getCurrentUrl(url) {
  // 拿到全部路由
  var routerList = JSON.parse(decodeURIComponent(localStorage.getItem('sys-data')));
  deelMenu(routerList); // 获取到当前页面的路由

  var pathname = window.location.pathname;
  var locationKey = null;
  var parmas = getUrlParams();

  if (parmas) {
    locationKey = parmas.key || null;
  }

  var key = null; // 优先跳转到同一个大菜单下面的目标路由
  // 如果不存在则优先跳转至未隐藏的目标路由
  // 都不存在才跳转至什么都不加的情况
  // 首先把全部同时包含当前路由与目标路由的一级路由找出来

  var aMenu = getTopMenu(routerList, pathname); // 包含当前URL的一级路由

  var bMenu = getTopMenu(routerList, url); // 包含目标URL的一级路由

  var targeMenu = [];
  aMenu.forEach(function (a) {
    bMenu.forEach(function (b) {
      if (a.menu_id === b.menu_id) {
        targeMenu.push(b);
      }
    });
  });

  if (targeMenu.length === 1) {
    key = getTargetMenuKey(targeMenu[0], url);
  }

  if (targeMenu.length > 1) {
    // 如果当前有key 则跳转至同样key的一级路由
    if (locationKey) {
      targeMenu.forEach(function (v) {
        if (v.rootKey === locationKey) {
          key = v.rootKey;
        }
      });
    } else {
      // 如果没有key,优先跳转至未隐藏的路由
      targeMenu.forEach(function (v) {
        var obj = getTargetMenu(v, url);

        if (String(obj.isMenu) === '1') {
          key = obj.rootKey;
        }
      });
    }
  }

  if (targeMenu.length === 0) {
    // 优先跳转至未隐藏的路由
    bMenu.forEach(function (v) {
      var obj = getTargetMenu(v, url);

      if (String(obj.isMenu) === '1') {
        key = obj.rootKey;
      }
    });
  }

  return key;

  function getTopMenu(routerList, url) {
    var arr = [];

    function deep(data) {
      var _iterator = _createForOfIteratorHelper(data),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var v = _step.value;

          if (v.child && v.child.length > 0) {
            var mark = deep(v.child); // 如果还有父节点继续往上抛出

            if (mark && v.parentId !== 0) {
              return true;
            }

            if (mark && v.parentId === 0) {
              arr.push(v);
            }
          }

          if (v.path === url) {
            return true;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }

    deep(routerList);
    return arr;
  }

  function getTargetMenuKey(router, url) {
    var key = null;

    function deep(data) {
      var _iterator2 = _createForOfIteratorHelper(data),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var v = _step2.value;

          if (v.child && v.child.length > 0) {
            var mark = deep(v.child); // 如果还有父节点继续往上抛出

            if (mark && v.parentId !== 0) {
              return true;
            }

            if (mark && v.parentId === 0) {
              key = v.key;
            }
          }

          if (v.path === url) {
            return true;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }

    deep([router]);
    return key;
  }

  function getTargetMenu(router, url) {
    var obj = null;

    function deep(data) {
      var _iterator3 = _createForOfIteratorHelper(data),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var v = _step3.value;

          if (v.child && v.child.length > 0) {
            deep(v.child);
          }

          if (v.path === url) {
            obj = v;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }

    deep([router]);
    return obj;
  }

  function deelMenu(routerList) {
    routerList.forEach(function (v) {
      var key = v.menu_code;

      if (v.child && v.child.length > 0) {
        deep(v.child, key);
      }
    });

    function deep(arr, key) {
      arr.forEach(function (v) {
        v.rootKey = key;

        if (v.child && v.child.length > 0) {
          deep(v.child, key);
        }
      });
    }
  }
}

// 身份证号码校验
function checkIdCard(value) {
  if (!value) {
    return false;
  }

  var city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  };

  if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(([0-2][1-9])|10|20|30|31)\d{3}(\d|X)$/i.test(value)) {
    return false;
  }

  if (!city[value.substr(0, 2)]) {
    return false;
  } // 18位身份证需要验证最后一位校验位


  if (value.length === 18) {
    value = value.split(''); // ∑(ai×Wi)(mod 11)
    // 加权因子

    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 校验位

    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    var sum = 0;
    var ai = 0;
    var wi = 0;

    for (var i = 0; i < 17; i += 1) {
      ai = value[i];
      wi = factor[i];
      sum += ai * wi;
    }

    if (parity[sum % 11] !== value[17]) {
      return false;
    }
  }

  return true;
} // 常用邮箱校验

function checkEmail(value) {
  if (!value) {
    return false;
  }

  var regx = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  return regx.test(value);
} // 手机号码校验

function checkPhone(value) {
  if (!value) {
    return false;
  }

  var phoneReg = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
  return phoneReg.test(value);
}

export { checkEmail, checkIdCard, checkPhone, getCurrentUrl, getUrlParams, goToUrl, goToUrlAndSaveBykey, goToUrlByKey, openNewUrlByKey };
