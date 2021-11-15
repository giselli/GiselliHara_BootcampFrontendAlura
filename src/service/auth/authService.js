import { parseCookies } from 'nookies';
import jwt from 'jsonwebtoken';
import { loginService, LOGIN_COOKIE_APP_TOKEN } from '../login/loginService';
import { HTTPClient } from '../../infra/http/HTTPClient';
import { isStagingEnv } from '../../infra/env/isStagingEnv';

const BASE_URL = isStagingEnv
  ? 'https://instalura-api-git-master-omariosouto.vercel.app'
  : 'https://instalura-api.omariosouto.vercel.app';

export const authService = (ctx) => {
  const cookies = parseCookies(ctx);
  const token = cookies[LOGIN_COOKIE_APP_TOKEN];
  const session = jwt.decode(token);

  return {
    async getToken() {
      return token;
    },
    async hasActiveSession() {
      return HTTPClient(`${BASE_URL}/api/auth`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(({ data }) => {
        if (data.authenticated) {
          return true;
        }
        loginService.logout(ctx);
        return false;
      }).catch(() => {
        loginService.logout(ctx);
        return false;
      });
    },
    async getSession() {
      return session.user;
    },
  };
};
