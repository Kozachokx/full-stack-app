import axios, { AxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";
import { LocalStorage } from "../api/local-storage";
// import { mock } from "../../mock";

// https://vitejs.dev/guide/env-and-mode.html
const API_URL = import.meta.env.VITE_BACK_API_URL;

const http = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  // headers: {'X-Custom-Header': 'foobar'}
});

/**
 * @param {{
 * url: string,
 * method: string,
 * headers?: object,
 * data?: object,
 * params?: object
 * }} options
 */
async function sendRequest<T>(options: AxiosRequestConfig): Promise<any> {
  try {
    // * Imposible to use HOOKS here

    // Try to send request
    let response = await http(options);

    const result = response?.data?.data || response?.data || response;

    //  if (!response || !response.data) {
    //    console.error(`Request has been sent, but no data received from request!`);
    //    return { data: null, success: true };
    //  }

    return { data: result, success: true };
  } catch (err: any) {
    let error = err.response?.data || err;

    // if (error.response && error.response.data) {
    //   err = error.response.data;
    // }

    return { data: error, success: false };
  }
}

const generateExtraQueryParams = (params) => {
  const { page, size, sortField, sortType } = params || {};
  const extraQuaryParams = [`page=${page || 1}`]

  if (size > 0) extraQuaryParams.push(`size=${size}`)
  if (sortField) extraQuaryParams.push(`sortField=${sortField}`)
  if (sortType) extraQuaryParams.push(`sortType=${sortType}`)

  return extraQuaryParams.join('&');
}

/**
 * @param {{
 * url: string,
 * method: string,
 * headers?: object,
 * data?: object,
 * params?: object
 * }} options
 */
async function sendRequestAuth<T>(options: AxiosRequestConfig, requestRetry = true): Promise<any> {
  const tokens = LocalStorage.getTokens();

  try {
    const extraParams: AxiosRequestConfig = {};

    // Add accessToken to Header
    if (tokens) {
      extraParams.headers = {};
      extraParams.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }

    const config = { ...options, ...extraParams };

    const response = await http(config);

    return {
      data: response?.data?.data || response?.data || response,
      success: true,
    };
  } catch (err: any) {
    let error = err.response?.data || err;

    // If token Experied => Generate new accessToken from refreshToken
    if (
      requestRetry &&
      tokens?.refreshToken &&
      (error.status === 403 || error.response?.status === 403)
    ) {
      const { data, success } = await backendApi.auth.refreshAccessToken({
        refreshToken: tokens?.refreshToken,
      });

      if (!success) {
        // If Refresh token has been experied => change msg
        if (data.status === 403) {
          console.warn('Refresh token expired!')
          data.message = `Refresh token has been experied!`;
        }

        LocalStorage.deleteTokens();
        LocalStorage.deleteUserData();

        return await sendRequestAuth(options, false);
      }

      // Save new Credentials
      LocalStorage.setAccessToken({ accessToken: data.accessToken });

      // Recursion to resend request | accessToken has been updated at this step
      return await sendRequestAuth(options, false);
    }

    return { data: error, success: false };
  }
}

const backendApi = {
  auth: {
    login: async (params) => {
      const { username, password } = params;
      return await sendRequest({
        method: "POST",
        url: "api/auth/login",
        baseURL: API_URL,
        data: { username, password },
      });
    },
    signup: async (params) => {
      const { username, password, email } = params;
      return await sendRequest({
        method: "POST",
        url: "api/auth/signup",
        baseURL: API_URL,
        data: { username, password, email },
      });
    },

    refreshAccessToken: async ({ refreshToken }) => {
      return await sendRequest({
        method: "POST",
        url: "api/auth/refresh",
        baseURL: API_URL,
        data: { refreshToken },
      });
    },

    logout: async (params) => {
      const { accessToken, refreshToken } = params;
      return await sendRequest({
        method: "POST",
        url: "api/auth/logout",
        baseURL: API_URL,
        data: { accessToken, refreshToken },
      });
    },
  },

  users: {
    getByAuthToken: async () => {
      const response = await sendRequestAuth({
        method: "GET",
        url: "api/user/token",
        baseURL: API_URL,
      }, false);
      return response;
    }
  },

  review: {
    createNew: async (params) => {
      const { imageUrl, text, description } = params || {};

      const response = await sendRequestAuth({
        method: "POST",
        url: `api/review`,
        baseURL: API_URL,
        data: { imageUrl, text, description },
      });
      return response;
    },
    getAll: async (params) => {
      const extraQuaryParams = generateExtraQueryParams(params)

      const response = await sendRequestAuth({
        method: "GET",
        url: `api/review/all?${extraQuaryParams}`,
        baseURL: API_URL,
      });
      return response;
    },
    getOnlyUserReviews: async (params) => {
      const extraQuaryParams = generateExtraQueryParams(params)

      const response = await sendRequestAuth({
        method: "GET",
        url: `api/review/my?${extraQuaryParams}`,
        baseURL: API_URL,
      });
      return response;
    },
    getById: async (id) => {
      const response = await sendRequestAuth({
        method: "GET",
        baseURL: API_URL,
        url: `api/review/${id}`,
      });
      return response;
    },
    updateById: async (review) => {
      const { id, ...restData } = review;
      // console.log(`Update review '${id}':`, restData)

      if (!id) return { success: false };

      const response = await sendRequestAuth({
        method: "PUT",
        baseURL: API_URL,
        url: `api/review/${id}`,
        data: { ...restData },
      });
      return response;
    },
    deleteById: async (id) => {
      const response = await sendRequestAuth({
        method: "DELETE",
        baseURL: API_URL,
        url: `api/review/${id}`,
      });
      return response;
    },
  },
};

export default backendApi;
