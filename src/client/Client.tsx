import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';
const baseURL = 'https://www.googleapis.com/youtube/v3';

export const axiosClient = () => {
  return axios.create({
    baseURL,
  });
};

export const request = ({url, headers, method, data}: AxiosRequestConfig) => {
  return new Promise<AxiosResponse>(async (resolve, reject) => {
    method = (method ?? 'GET').toUpperCase();
    const payload = {
      url,
      headers,
      method,
      data,
    };
    axiosClient()(payload)
      .then(res => resolve(res))
      .catch(err => {
        console.log(`ERR [client]: ${err}`);
        reject(err);
      });
  });
};
