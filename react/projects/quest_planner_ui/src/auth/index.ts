import { AUTH_CONFIG } from './config';
import { createAuthorization } from './lib/createAuthorization';

export * from './lib/state/createAuthState';
export * from './lib/createAuthorization';
export * from './lib/state/createAuthState';

export const {
  useAuthState,
  useLogin,
  useBackendUserProfile,
  useLogout,
  tokenInterceptor,
  errorInterceptor,
  authenticatedHttpClient: httpClient,
} = createAuthorization(AUTH_CONFIG);
