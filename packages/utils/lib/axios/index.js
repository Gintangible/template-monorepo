import axios from 'axios';
import { clone, isEmpty, isNull, isString, isUndefined } from 'lodash-es';
import JSONbig from 'json-bigint';
import { showDialog, showNotify } from 'vant';
import { VAxios } from './Axios';
import { formatRequestDate, joinTimestamp } from './helper';
import { AxiosRetry } from './axiosRetry';
import { deepMerge, setObjToUrlParams } from '../common';

const jsonParser = JSONbig({
  storeAsString: true, // 把64位整数存储为字符串
});

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform = {
  /**
   * @description: 处理响应数据。如果数据不是预期格式，可直接抛出错误
   */
  transformResponseHook: (res, options) => {
    const { isTransformResponse, isReturnNativeResponse } = options;

    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }

    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    // 错误的时候返回
    const { data } = res;
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error('请求出错，请稍候重试');
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, data: result, msg } = data;

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = data && Reflect.has(data, 'code') && code === 200;
    if (hasSuccess) {
      let successMsg = msg;

      if (isNull(successMsg) || isUndefined(successMsg) || isEmpty(successMsg)) {
        successMsg = '操作成功';
      }

      if (options.successMessageMode === 'modal') {
        showDialog({
          title: '成功提示',
          content: successMsg,
          noCancelBtn: true,
        });
      }
      else if (options.successMessageMode === 'message') {
        showNotify.success(successMsg);
      }
      return result;
    }

    // errorMessageMode='modal'的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
    // errorMessageMode='none' 一般是调用时明确表示不希望自动弹出错误提示
    if (options.errorMessageMode === 'modal') {
      showDialog({
        title: '提示',
        content: timeoutMsg,
        noCancelBtn: true,
      });
    }
    else if (options.errorMessageMode === 'message') {
      showNotify.danger(timeoutMsg);
    }
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === 'GET') {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      }
      else {
        // 兼容restful风格
        config.url = `${config.url + params}${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    }
    else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (
          Reflect.has(config, 'data')
          && config.data
          && (Object.keys(config.data).length > 0 || config.data instanceof FormData)
        ) {
          config.data = data;
          config.params = params;
        }
        else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url,
            Object.assign({}, config.params, config.data),
          );
        }
      }
      else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res) => {
    return {
      ...res,
      data: jsonParser.parse(res.request.responseText),
    };
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (axiosInstance, error) => {
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const msg = response?.data?.error?.message || '';
    const err = error?.toString || '';
    let errMessage = '';

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    try {
      if (code === 'ECONNABORTED' && message.includes('timeout')) {
        errMessage = '接口请求超时,请刷新页面重试!';
      }
      if (err.includes('Network Error')) {
        errMessage = '网络异常，请检查您的网络连接是否正常!';
      }

      if (errMessage) {
        if (errorMessageMode === 'modal') {
          showDialog({
            title: '提示',
            content: errMessage,
            noCancelBtn: true,
          });
        }
        else if (errorMessageMode === 'message') {
          showNotify.danger(errMessage);
        }
        return Promise.reject(error);
      }
    }
    catch (error) {
      throw new Error(error);
    }

    // 添加自动重试机制 保险起见 只针对GET请求
    const retryRequest = new AxiosRetry();
    const { isOpenRetry } = config?.requestOptions?.retryRequest;
    if (config.method?.toUpperCase() === 'GET'
      && isOpenRetry
      && error?.response?.status !== 401) {
      retryRequest.retry(axiosInstance, error);
    }
    return Promise.reject(error);
  },
};

export default function createAxios(opt) {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        authenticationScheme: '',
        timeout: 10 * 1000,
        // 基础接口地址

        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        // 如果是form-data格式
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        // 数据处理方式
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'modal',
          // 接口地址
          apiUrl: '',
          // 接口拼接地址
          //  是否加入时间戳
          joinTime: true,
          urlPrefix: '',
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
          retryRequest: {
            isOpenRetry: true,
            count: 5,
            waitTime: 100,
          },
        },
      },
      opt || {},
    ),
  );
}
