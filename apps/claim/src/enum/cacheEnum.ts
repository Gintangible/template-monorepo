const Prefix = import.meta.env.VITE_APP_PRODUCT_SERIAL || '';

export const TOKEN_KEY = `${Prefix}_token`; // 登录token