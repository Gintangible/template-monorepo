import { createAxios } from '@gy/utils';
import { TOKEN_KEY } from '@/enum/cacheEnum';

const transform = {
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    const token = localStorage.getItem(TOKEN_KEY);
    if (token && token !== 'null' && config?.requestOptions?.withToken !== false) {
      config.headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    config.headers['Product-Serial'] = import.meta.env.VITE_APP_PRODUCT_SERIAL;
    return config;
  },
}

const request = createAxios({
  baseURL: '',
  transform,
});

export default request;

