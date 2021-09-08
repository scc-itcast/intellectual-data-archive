import { request } from "@/api/_service.js";

const assignParams = (params, key) => {
  const paramsList = {
    user: {}
  };
  // 上面数据根据实际需要替换
  return Object.assign({}, paramsList[key], params);
};

// 通用接口
export function CommonFun(method, url, params, key) {
  const data = assignParams(params, key);
  // 接口请求
  return request({
    url,
    method,
    data
  });
}

export function CommonFunEmpty(method, url, data) {
  // 接口请求
  return request({
    url,
    method,
    data
  });
}

/*
  在组件中调用方式
  async
  const data = await this.CommonFun('post', '/gatter/0',{},'user')
*/
