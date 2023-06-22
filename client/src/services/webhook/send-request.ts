import axios, { AxiosRequestConfig } from 'axios';

// interface IAxiosResponse<T> {
//   data?: T;
//   message?: string;
//   options?: AxiosRequestConfig;
//   success: boolean;
// }

/**
 * @param {{
 * url: string,
 * method: string,
 * headers?: object,
 * data?: object,
 * params?: object
 * }} options
 */
export async function sendRequest<T>(options: AxiosRequestConfig): Promise<any> {
  try {
    const result = await axios(options);

    if (!result || !result.data) {
      console.error(`Request has been sent, but no data received from request!`);
      return null;
      // return { success: false };
    }

    return result.data;
    // return { data: result.data, success: true };
  } catch (error: any) {
    console.error(`Request failed! Error: `, error,);

    return error;
    // return { options, success: false };
  }
}
