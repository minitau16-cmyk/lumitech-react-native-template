import { authStore$ } from './store';

export const authStoreActions = {
  setToken: (token: string) => {
    authStore$.token.set(token);
  },

  setRefreshToken: (refreshToken: string) => {
    authStore$.refreshToken.set(refreshToken);
  },

  setTokens: (accessToken: string, refreshToken: string) => {
    authStore$.token.set(accessToken);
    authStore$.refreshToken.set(refreshToken);
  },
};
