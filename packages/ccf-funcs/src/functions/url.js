import { stringify } from 'qs';

// 当前页URL跳转，参数放在URL上面，无加密
export function goToUrl(router, payload = {}) {
  if (JSON.stringify(payload) === '{}') {
    window.location.href = `http://${window.location.host}${router}`;
  } else {
    window.location.href = `http://${window.location.host}${router}?${stringify(
      payload,
    )}`;
  }
}

// 获取URL上面的参数，如果没有返回null，有参数则返回对象
export function getUrlParams() {
  const str = window.location.search;
  if (str !== '' && str && str.length > 0) {
    const newstr = str.substring(1);
    const arr = newstr.split('&');
    const payload = {};
    arr.forEach(v => {
      const param = v.split('=');
      payload[param[0]] = window.decodeURIComponent(param[1]);
    });
    return payload;
  }
  return null;
}
