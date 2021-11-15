import { isStagingEnv } from '../../infra/env/isStagingEnv';
import { HTTPClient } from '../../infra/http/HTTPClient';
import { authService } from '../auth/authService';

const BASE_URL = isStagingEnv
  // Back end de Dev
  ? 'https://instalura-api-git-master-omariosouto.vercel.app'
  // Back end de prod
  : 'https://instalura-api.vercel.app';

export const userService = {
  async getProfilePage(ctx) {
    const url = `${BASE_URL}/api/users/posts/`;
    try {
      const token = await authService(ctx).getToken();
      const response = await HTTPClient(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return {
        user: {
          totalLikes: 1,
        },
        posts: response.data,
      };
    } catch (err) {
      throw new Error('Nao conseguiu trazer os post do user', err);
    }
  },

  async newPost(data) {
    const url = `${BASE_URL}/api/posts`;
    try {
      const token = await authService().getToken();
      const response = await HTTPClient(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });
      return response.data;
    } catch (err) {
      throw new Error('Não foi possivel enviar o novo post', err);
    }
  },

  async Liked(postId) {
    const url = `${BASE_URL}/api/posts/${postId}/like`;
    try {
      const token = await authService().getToken();
      const response = await HTTPClient(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: {},
      });
      if (response.data) {
        return response.data;
      }
      return undefined;
    } catch (err) {
      return undefined;
    }
  },

  async githubInfos(user) {
    const url = `https://api.github.com/users/${user}`;
    const response = await HTTPClient(url, {});
    return response;
  },
};
