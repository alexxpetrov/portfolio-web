import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { ENDPOINT } from "./config";

// Create a reusable Axios instance with withCredentials: true for cookies
export const ssrAxiosInstance = axios.create({
  baseURL: `${ENDPOINT}/api`, // Your API base URL
});

// Define the structure of a retry queue item
interface RetryQueueItem {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (value?: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

// Add global request interceptor
ssrAxiosInstance.interceptors.request.use(
  async (config) => {
    // Modify request config here, e.g., add headers

    if (
      config.headers?.Authorization === null &&
      config.url !== "/refresh-token"
    ) {
      console.log(config);
      const accessToken = await refreshAccessToken(); // Get the access token via the refresh token

      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);

// Function to refresh the access token using the refresh token stored in cookies
const refreshAccessToken = async () => {
  const response = await ssrAxiosInstance.post(
    "/refresh-token",
    {},
    {
      withCredentials: true, // Send refresh token (stored in cookie)
    }
  );

  if (response.status !== 200) {
    throw new Error("Failed to refresh token");
  }

  return response.data.access_token;
};

export const useAxiosSSRInterceptor = () => {
  // Create a list to hold the request queue
  const refreshAndRetryQueue: RetryQueueItem[] = [];
  // @TODO: Add logout functionality when both accesstoken/refreshtoken have expired.

  // Flag to prevent multiple token refresh requests
  let isRefreshing = false;

  ssrAxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest: AxiosRequestConfig = error.config;
      if (
        error.response &&
        error.response.status === 401 &&
        error.config.url !== "/refresh-token"
      ) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            // Refresh the access token
            const newAccessToken = await refreshAccessToken();

            // Update the request headers with the new access token
            error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;

            // Retry all requests in the queue with the new token
            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              ssrAxiosInstance
                .request(config)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
            });

            // Clear the queue
            refreshAndRetryQueue.length = 0;

            // Retry the original request
            return ssrAxiosInstance(originalRequest);
          } finally {
            isRefreshing = false;
          }
        }

        // Add the original request to the queue
        return new Promise<void>((resolve, reject) => {
          refreshAndRetryQueue.push({
            config: originalRequest,
            resolve,
            reject,
          });
        });
      }

      // @TODO: Add logout functionality when both accesstoken/refreshtoken have expired.
      // setUser(null);

      // Return a Promise rejection if the status code is not 401
      return Promise.reject(error);
    }
  );
};

export const useSSRFetch = () => {
  // Main request function that manages access tokens and retries failed requests
  const protectedFetcher = async (url: string, config: AxiosRequestConfig) => {
    // Make the API request using ssrAxiosInstance
    const response = await ssrAxiosInstance(url, config);

    return response.data; // If request succeeds, return the data
  };

  const fetcher =
    ({ url }: { url: string }) =>
    async () => {
      try {
        const apiResponse = await ssrAxiosInstance.get(url);

        const result = apiResponse.data;
        return result;
      } catch (error) {
        console.log("Error occurred:", (error as AxiosError).message);
        return;
      }
    };

  return { protectedFetcher, fetcher };
};