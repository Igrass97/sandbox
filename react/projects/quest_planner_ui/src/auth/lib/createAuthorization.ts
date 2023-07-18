import { RQ_CONFIG } from '../../queries/config';
import { createErrorRefreshTokenInterceptor } from './interceptors/createErrorRefreshTokenInterceptor';
import { createTokenInterceptor } from './interceptors/createTokenInterceptor';
import createAuthState, { IAuthState } from './state/createAuthState';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface IAuthorizationConfig<UserType> {
  backendLogin: (userInfo: unknown) => Promise<unknown>;
  backendRefreshToken?: (
    userInfo: unknown
  ) => Promise<unknown> | null | undefined;

  LOCAL_STORAGE_TOKEN_KEY?: string;
  REFRESH_LOCAL_STORAGE_TOKEN_KEY?: string;

  apiBaseUrl: string;
  getUserURL: string;

  userResponseAccessTokenKey?: string;
  userResponseRefreshTokenKey?: string;

  onLogin?: (data: unknown, state: IAuthState<UserType>) => void;
  onLogout?: (state: IAuthState<UserType>) => void;

  unprotectedApiRoutes?: string[];
}

/**
 * Creates the authorization hooks and the token interceptor
 * @param backendLogin - Function that logs in the user
 * @param getUserURL - Current user url
 * @param backendRefreshToken - Function that refreshes the token
 * @param LOCAL_STORAGE_TOKEN_KEY - Key of the token in the local storage
 * @param REFRESH_LOCAL_STORAGE_TOKEN_KEY - Key of the refresh token in the local storage
 * @param apiBaseUrl - Base url of the api
 * @param userResponseAccessTokenKey - Key of the token in the user response
 * @param userResponseRefreshTokenKey - Key of the refresh token in the user response
 * @param onLogin - Function that is called after the user logs in
 * @param onLogout - Function that is called after the user logs out
 * @param unprotectedApiRoutes - Routes that should not be protected
 * @template UserType - Type of the user
 * @returns The authorization hooks and the token interceptor
 * @example
 * const {
 * useAuthState,
 * useLogin,
 * useLogout,
 * tokenInterceptor
 * } = createAuthorization(config);
 */
export function createAuthorization<UserType>({
  backendLogin,
  backendRefreshToken,
  getUserURL,
  LOCAL_STORAGE_TOKEN_KEY = 'accessToken',
  REFRESH_LOCAL_STORAGE_TOKEN_KEY = 'refreshToken',
  apiBaseUrl,
  userResponseAccessTokenKey = 'access',
  userResponseRefreshTokenKey = 'refresh',
  onLogin = () => null,
  onLogout = () => null,
  unprotectedApiRoutes = [],
}: IAuthorizationConfig<UserType>) {
  /**
   * Hook used to access the auth state and mutate it
   * @returns The auth state slice requested
   * @example
   * const user = useAuthState(state => state.user);
   */
  const useAuthState = createAuthState<UserType>();

  const getUser = async () => {
    const { data } = await httpClient.get(getUserURL);

    return data;
  };

  /**
   * Hook used to log in the user
   * @returns The login function
   * @example
   * const {mutate: login} = useLogin();
   * login({ username: 'admin', password: 'admin' });
   */
  const useLogin = () => {
    const state = useAuthState();

    return useMutation(async (userInfo: unknown) => {
      console.log(userInfo);
      const userResponse = await backendLogin(userInfo);

      localStorage.setItem(
        LOCAL_STORAGE_TOKEN_KEY,
        // @ts-ignore
        userResponse[userResponseAccessTokenKey]
      );
      localStorage.setItem(
        REFRESH_LOCAL_STORAGE_TOKEN_KEY,
        // @ts-ignore
        userResponse[userResponseRefreshTokenKey]
      );

      const user = await getUser();
      state.setUser(user);
      onLogin(user, state);
    });
  };

  /**
   * Hook used to log out the user
   * @returns The logout function
   * @example
   * const {mutate: logout} = useLogout();
   * logout();
   */
  const useLogout = () => {
    const removeUser = useAuthState(state => state.removeUser);
    const state = useAuthState();

    return () => {
      removeUser();
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
      localStorage.removeItem(REFRESH_LOCAL_STORAGE_TOKEN_KEY);

      onLogout(state);
    };
  };

  /**
   * Axios instance that is used to make requests to the api
   * @example
   * httpClient.get('/users');
   * httpClient.post('/users', { username: 'admin', password: 'admin' });
   */
  const httpClient = axios.create({
    baseURL: apiBaseUrl,
  });

  /**
   * Interceptor that adds the token to the Authorization header
   * @example
   * axios.interceptors.request.use(tokenInterceptor);
   */
  const tokenInterceptor = createTokenInterceptor({
    unprotectedApiRoutes,
    tokenLocalStorageKey: LOCAL_STORAGE_TOKEN_KEY,
  });

  /**
   * Interceptor that refreshes the token if the request fails
   * @example
   * axios.interceptors.response.use(undefined, errorInterceptor);
   */
  const errorInterceptor = backendRefreshToken
    ? createErrorRefreshTokenInterceptor({
        unprotectedApiRoutes,
        httpClient,
        backendRefreshToken,
        refreshTokenLocalstorageKey: REFRESH_LOCAL_STORAGE_TOKEN_KEY,
        tokenLocalstorageKey: LOCAL_STORAGE_TOKEN_KEY,
      })
    : undefined;

  httpClient.interceptors.request.use(tokenInterceptor);
  httpClient.interceptors.response.use(undefined, errorInterceptor);

  /**
   * Hook used to get the user data
   * @returns The user query
   * @example
   * const { data: user } = useBackendUserProfile();
   */
  const useBackendUserProfile = () => {
    const setUser = useAuthState(state => state.setUser);
    const enabled = !!localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);

    return {
      ...useQuery(['user'], getUser, {
        enabled: enabled,
        onSuccess: userDataResponse => setUser(userDataResponse || null),
      }),
      enabled,
    };
  };

  return {
    useAuthState,
    useLogin,
    useBackendUserProfile,
    useLogout,
    tokenInterceptor,
    errorInterceptor,
    authenticatedHttpClient: httpClient,
  };
}
