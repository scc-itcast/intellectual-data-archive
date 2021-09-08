import axios from "axios";
import Adapter from "axios-mock-adapter";
import { get, isEmpty, merge } from "lodash";
import qs from "qs";
import util from "@/libs/util";
import {
  requestInterceptor,
  requestRejectInterceptor,
  responseErrorHandler,
  responseSuccessHandler
} from "@/api/interceptor";

/**
 * @description 创建请求实例
 */
function createService() {
  // 创建一个 axios 实例
  const service = axios.create();
  // 请求拦截
  service.interceptors.request.use(
    requestInterceptor,
    requestRejectInterceptor
  );
  // 响应拦截
  service.interceptors.response.use(
    responseSuccessHandler,
    responseErrorHandler
  );
  return service;
}

function stringify(data) {
  return qs.stringify(data, { allowDots: true, encode: false });
}

/**
 * @description 创建请求方法
 * @param {Object} service axios 实例
 */
function createRequest(service) {
  return function(config) {
    // const token = util.cookies.get('token')
    const configDefault = {
      headers: {
        // Authorization: token,
        "Content-Type": "application/x-www-form-urlencoded"
      },
      timeout: 99999999999,
      baseURL: process.env.VUE_APP_API,
      data: {}
    };
    const option = merge(configDefault, config);
    // 处理 get 请求的参数
    // 请根据实际需要修改
    if (!isEmpty(option.params)) {
      option.url = option.url + "?" + stringify(option.params);
      option.params = {};
    }
    // 当需要以 form 形式发送时 处理发送的数据
    // 请根据实际需要修改
    if (
      !isEmpty(option.data) &&
      option.headers["Content-Type"] === "application/x-www-form-urlencoded"
    ) {
      if (util.cookies.get("uid")) {
        option.data = Object.assign(option.data, {
          uid: util.cookies.get("uid"),
          access_token: util.cookies.get("access_token"),
          partner_id: util.cookies.get("partner_id")
        });
      }
      // option.data = stringify(option.data)
    }
    return service(option);
  };
}

// 用于真实网络请求的实例和请求方法
export const service = createService();
export const request = createRequest(service);

// 用于模拟网络请求的实例和请求方法
export const serviceForMock = createService();
export const requestForMock = createRequest(serviceForMock);

// 网络请求数据模拟工具
export const mock = new Adapter(serviceForMock);

export default request;
