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

const axiosConfig: AxiosRequestConfig = {
  baseURL: `http://localhost:4000/sick`,
};

const instance: AxiosInstance = Axios.create(axiosConfig);

// const Apis = async (keyword: string) => {
//   try {
//     const response = await client.get(`/sick?q=${keyword}`);

//     console.log(response);
//   } catch (error: any) {
//     console.log(error);
//   }
// };

async function getApis(param: string): Promise<ISicks[] | undefined> {
  const keywordData = {
    params: {
      sickNm_like: param,
    },
  };
  try {
    const response = await instance.get(`?q=`, keywordData);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.log(error);
    return [];
  }
}

// async function Apis1(keyword: string) {
//   await client
//     .get(`/sick?q=${keyword}`)
//     .then((response: any) => {
//       console.log(response);
//     })
//     .catch((error: any) => {
//       console.log(error);
//     });
// }

// export const Apis = () => {
//   const keyWord = "담낭";

//   Axios({
//     url: `http://localhost:4000/sick?q=${keyWord}`,
//     header: "get",
//   })
//     .then(function (response) {
//       console.log(response);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

export default getApis;
