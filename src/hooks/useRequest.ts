import {Method} from 'axios';
import {Alert, ToastAndroid} from 'react-native';
import {request} from '../client/Client';
import {API_KEY} from '../constants/Constants';

type RequestProps = {
  url?: string;
  method?: Method;
  body?: any;
  headers?: any;
};

const useRequest = () => {
  const apiRequest = async ({
    url,
    method,
    body,
    headers: requestHeaders,
  }: RequestProps): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      const headers = {
        'Content-Type': 'application/json',
        ...requestHeaders,
      };

      const fullUrl = `${url}${url?.includes('?') ? '&' : '?'}key=${API_KEY}`;
      console.log(fullUrl);
      request({
        url: fullUrl,
        method,
        headers,
        data: body,
      })
        .then(result => {
          const data = result.data;

          if (__DEV__) {
            console.log(url, 'API response :: >', data);
          }
          if (data?.success || data?.status || data?.items) {
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch(err => {
          if (__DEV__) {
            console.log(url, 'API Error :: >', JSON.stringify(err.response));
          }
          reject(err);
        });
    });
  };

  const parseError = (error: any) => {
    if (error && error?.message && typeof error?.message == 'object') {
      const keys = Object.keys(error.message);
      if (keys.length) {
        const message = error?.message[keys[0]][0];
        if (message && typeof message == 'string') return message;
      }
    } else if (error.message && typeof error.message == 'string') {
      return error?.message;
    }
  };

  return {apiRequest, parseError};
};

export default useRequest;
