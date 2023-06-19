import axios, { AxiosRequestConfig } from "axios";
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
   const result = await http(options);

   if (!result || !result.data) {
     console.error(`Request has been sent, but no data received from request!`);
     return null;
   }

   return result.data;
 } catch (error: any) {

   return error;
 }
}

const backendApi = {
  review: {
     getAll: async (params) => {
      const res = await sendRequest({
        method: 'GET',
        url: 'api/review/all',
        baseURL: API_URL,
        ...params
      })
      return res.data;
    },
  }
}

export default backendApi;