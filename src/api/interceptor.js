/**
 * interceptor
 * @description  拦截器
 * @module http/interceptor
 * @author yujingxuan
 */
import { Message } from 'element-ui'
import { get, isEmpty, merge } from 'lodash'
import router from '@/router'
import util from '@/libs/util'
import store from '@/store'
let flag = true

/**
 * @description 记录和显示错误
 * @param {Error} error 错误对象
 */
function handleError(error) {
  // 添加到日志
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 10 * 1000
  })
}

export function requestInterceptor(config) {
  const formData = new FormData()
  for (const key in config.data) {
    formData.append(key, config.data[key])
  }
  config.data = formData
  return config
}

export function requestRejectInterceptor(error) {
  // 发送失败
  console.log(error)
  return Promise.reject(error)
}

export async function responseSuccessHandler(response) {
  if (
    response.data.message.indexOf('Token 不存在！') != -1 ||
    response.data.message.indexOf('Token 过期！') != -1
  ) {
    if (flag) {
      flag = false
      store.dispatch('d2admin/account/logout', {
        confirm: false
      })
      setTimeout(() => {
        flag = true
      }, 1000 * 60)
    }
  }

  if (response.data.errcode === undefined) {
    return response.data
  }

  // 有 code 判断为项目接口请求
  switch (response.data.errcode) {
    // 返回响应内容
    case 0:
      return response.data
    // 例如在 code 401 情况下退回到登录页面
    case 401:
      throw new Error('请重新登录')
    // 根据需要添加其它判断
    default:
      throw new Error(`${response.data.message}: ${response.config.url}`)
  }
}

export function responseErrorHandler(error) {
  const status = get(error, 'response.status')
  switch (status) {
    case 400:
      error.message = '请求错误'
      break
    case 401:
      error.message = '未授权，请登录'
      break
    case 403:
      error.message = '拒绝访问'
      break
    case 404:
      error.message = `请求地址出错: ${error.response.config.url}`
      break
    case 408:
      error.message = '请求超时'
      break
    case 500:
      error.message = '服务器内部错误'
      break
    case 501:
      error.message = '服务未实现'
      break
    case 502:
      error.message = '网关错误'
      break
    case 503:
      error.message = '服务不可用'
      break
    case 504:
      error.message = '网关超时'
      break
    case 505:
      error.message = 'HTTP版本不受支持'
      break
    default:
      break
  }
  handleError(error)
  throw error
}
