import Axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface ISicks {
  sickCd: string;
  sickNm: string;
}

// interface ResponseTypeManager {
//   fetchSearchedSicks: (
//     keyword: string,
//   ) => Promise<Array<ResponseType> | null | undefined>;
// }

export const axiosConfig: AxiosRequestConfig = {
  baseURL: `http://localhost:4000/sick`,
};

export const instance: AxiosInstance = Axios.create(axiosConfig);
