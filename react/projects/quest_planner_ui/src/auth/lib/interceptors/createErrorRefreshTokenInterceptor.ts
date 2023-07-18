import { AxiosInstance } from 'axios';

export const createErrorRefreshTokenInterceptor = ({
  unprotectedApiRoutes = [],
  httpClient,
  backendRefreshToken,
  refreshTokenLocalstorageKey,
  tokenLocalstorageKey,
}: {
  unprotectedApiRoutes?: string[];
  httpClient: AxiosInstance;
  backendRefreshToken: any;
  refreshTokenLocalstorageKey: string;
  tokenLocalstorageKey: string;
}) => {
  const doRefresh = async (refreshToken: string) => {
    try {
      const refreshData = await backendRefreshToken(refreshToken);
      return refreshData;
    } catch (error) {
      return null;
    }
  };

  let isRefreshingToken = false;
  let requestsToRefresh: ((token: string) => void)[] = [];

  const handle401 = (error: any) => {
    const response = error.response;
    const refreshToken = localStorage.getItem(refreshTokenLocalstorageKey);

    if (!refreshToken) {
      window.location.href = '/';
      return Promise.reject(response);
    }

    if (!isRefreshingToken) {
      isRefreshingToken = true;

      doRefresh(refreshToken)
        .then(refreshResponse => {
          if (!refreshResponse) {
            return Promise.reject(error);
          }

          localStorage.setItem(tokenLocalstorageKey, refreshResponse.access);

          requestsToRefresh.forEach((callback: (access: string) => void) =>
            callback(refreshResponse.access)
          );
        })
        .catch(() => {
          localStorage.removeItem(tokenLocalstorageKey);
          localStorage.removeItem(refreshTokenLocalstorageKey);
          window.location.href = '/';
        })
        .finally(() => {
          requestsToRefresh = [];
          isRefreshingToken = false;
        });
    }

    return new Promise((resolve, reject) => {
      requestsToRefresh.push((token: string) => {
        if (token) {
          resolve(httpClient(error.config));
        } else {
          reject(error);
        }
      });
    });
  };

  return (error: any) => {
    if (
      (error.response.status === 401 || error.response.status === 422) &&
      !unprotectedApiRoutes.includes(error.config.url)
    )
      return handle401(error);

    return Promise.reject(error);
  };
};
