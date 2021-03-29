/* eslint-disable no-shadow */
import { stringify } from 'qs';
import { getUrlParams } from './url';

// 当前页URL跳转，参数放在URL上面，无加密
export function goToUrlByKey(router, payload = {}) {
  const key = getCurrentUrl(router);

  if (key) {
    payload.key = key;
  }
  if (JSON.stringify(payload) === '{}') {
    window.location.href = `http://${window.location.host}${router}`;
  } else {
    window.location.href = `http://${window.location.host}${router}?${stringify(
      payload,
    )}`;
  }
}

// 当前页URL跳转，参数放在sessionStorage上面，无加密
export function goToUrlAndSaveBykey(router, name = null, payload = {}) {
  const data = JSON.stringify(payload);
  if (data !== '{}' && name) {
    sessionStorage.setItem(name, data);
  } else if (data === '{}' && name) {
    sessionStorage.removeItem(name);
  }

  const key = getCurrentUrl(router);

  if (key) {
    payload.key = key;
  }

  window.location.href = `http://${window.location.host}${router}?${stringify(
    payload,
  )}`;
}

// 新建标签页URL跳转，参数放在URL上面，无加密
export function openNewUrlByKey(router, payload = {}) {
  const key = getCurrentUrl(router);

  if (key) {
    payload.key = key;
  }

  if (JSON.stringify(payload) === '{}') {
    window.open(`http://${window.location.host}${router}`);
  } else {
    window.open(
      `http://${window.location.host}${router}?${stringify(payload)}`,
    );
  }
}

// 根据传入的url去计算到底应该跳转到哪个页面
export function getCurrentUrl(url) {
  // 拿到全部路由
  const routerList = JSON.parse(
    decodeURIComponent(localStorage.getItem('sys-data')),
  );
  deelMenu(routerList);

  // 获取到当前页面的路由
  const { pathname } = window.location;

  let locationKey = null;
  const parmas = getUrlParams();
  if (parmas) {
    locationKey = parmas.key || null;
  }
  let key = null;

  // 优先跳转到同一个大菜单下面的目标路由
  // 如果不存在则优先跳转至未隐藏的目标路由
  // 都不存在才跳转至什么都不加的情况

  // 首先把全部同时包含当前路由与目标路由的一级路由找出来
  const aMenu = getTopMenu(routerList, pathname); // 包含当前URL的一级路由
  const bMenu = getTopMenu(routerList, url); // 包含目标URL的一级路由

  const targeMenu = [];
  aMenu.forEach(a => {
    bMenu.forEach(b => {
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
      targeMenu.forEach(v => {
        if (v.rootKey === locationKey) {
          key = v.rootKey;
        }
      });
    } else {
      // 如果没有key,优先跳转至未隐藏的路由
      targeMenu.forEach(v => {
        const obj = getTargetMenu(v, url);
        if (String(obj.isMenu) === '1') {
          key = obj.rootKey;
        }
      });
    }
  }
  if (targeMenu.length === 0) {
    // 优先跳转至未隐藏的路由
    bMenu.forEach(v => {
      const obj = getTargetMenu(v, url);
      if (String(obj.isMenu) === '1') {
        key = obj.rootKey;
      }
    });
  }

  return key;

  function getTopMenu(routerList, url) {
    const arr = [];

    function deep(data) {
      for (const v of data) {
        if (v.child && v.child.length > 0) {
          const mark = deep(v.child);
          // 如果还有父节点继续往上抛出
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
    }
    deep(routerList);
    return arr;
  }

  function getTargetMenuKey(router, url) {
    let key = null;

    function deep(data) {
      for (const v of data) {
        if (v.child && v.child.length > 0) {
          const mark = deep(v.child);
          // 如果还有父节点继续往上抛出
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
    }
    deep([router]);
    return key;
  }

  function getTargetMenu(router, url) {
    let obj = null;

    function deep(data) {
      for (const v of data) {
        if (v.child && v.child.length > 0) {
          deep(v.child);
        }

        if (v.path === url) {
          obj = v;
        }
      }
    }
    deep([router]);
    return obj;
  }

  function deelMenu(routerList) {
    routerList.forEach(v => {
      const key = v.menu_code;
      if (v.child && v.child.length > 0) {
        deep(v.child, key);
      }
    });

    function deep(arr, key) {
      arr.forEach(v => {
        v.rootKey = key;
        if (v.child && v.child.length > 0) {
          deep(v.child, key);
        }
      });
    }
  }
}
