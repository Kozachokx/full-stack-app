import axios, { AxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";
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

    // const x1 = useSelector((state) => state.auth);
    // console.log(x1);
    // const x2 = useSelector((state) => state.auth.accessToken);
    // console.log(x2);
    // const x3 = useSelector((state) => state);
    // console.log(x3);

    // Try to send request
    let response = await http(options);

    console.warn(" ! ! ! ! ! !");
    console.warn(response);

    // Try to send request
    // TODO: If token Experied => Generate new accessToken from refreshToken
    // TODO: Then save new Credentials
    // TODO: try to resend request

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
  },

  review: {
    getAll: async (params) => {
      const response = await sendRequest({
        method: "GET",
        url: "api/review/all",
        baseURL: API_URL,
        ...params,
      });
      return response;
      // return res.data;
    },
  },
};

export default backendApi;
