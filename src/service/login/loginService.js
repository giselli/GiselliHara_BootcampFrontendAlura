import { destroyCookie, setCookie } from 'nookies';
import { isStagingEnv } from '../../infra/env/isStagingEnv';
import { HTTPClient } from '../../infra/http/HTTPClient';

const BASE_URL = isStagingEnv
  // Back end de Dev
  ? 'https://instalura-api-git-master-omariosouto.vercel.app'
  // Back end de prod
  : 'https://instalura-api.vercel.app';

export const LOGIN_COOKIE_APP_TOKEN = 'LOGIN_COOKIE_APP_TOKEN';

export const loginService = {
  async login({ username, password },
    setCookieModule = setCookie,
    HttpClientModule = HTTPClient) {
    return HttpClientModule(`${BASE_URL}/api/login`, {
      method: 'POST',
      body: {
        username,
        password,
      },
    }).then((respostaConvertida) => {
      const { token } = respostaConvertida.data;
      const hasToken = token;
      if (!hasToken) {
        throw new Error('Failed to login');
      }
      setCookieModule(null, LOGIN_COOKIE_APP_TOKEN, token, {
        path: '/',
        maxAge: 86400 * 7,
      });
      return { token };
    });
  },
  async logout(ctx, destroyCookieModule = destroyCookie) {
    destroyCookieModule(ctx, LOGIN_COOKIE_APP_TOKEN, { path: '/' });
  },
};
