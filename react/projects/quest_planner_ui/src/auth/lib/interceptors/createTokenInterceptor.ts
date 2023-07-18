/**
 * Creates an interceptor that adds the token to the Authorization header
 * @param unprotectedApiRoutes - Routes that should not be protected
 * @param tokenLocalStorageKey - Key of the token in the local storage
 * @returns The interceptor
 * @example
 * const tokenInterceptor = createTokenInterceptor({
 *  unprotectedApiRoutes: ['/api/auth/login'],
 *  tokenLocalStorageKey: 'access_token'
 * });
 * axios.interceptors.request.use(tokenInterceptor);
 */

export const createTokenInterceptor = ({
  unprotectedApiRoutes = [],
  tokenLocalStorageKey = 'access_token'
}: {
  unprotectedApiRoutes: string[];
  tokenLocalStorageKey: string;
}) => config => {
  if (unprotectedApiRoutes.some(r => config.url.includes(r))) {
    return config;
  }

  const token = 'Bearer ' + localStorage.getItem(tokenLocalStorageKey);

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
};
