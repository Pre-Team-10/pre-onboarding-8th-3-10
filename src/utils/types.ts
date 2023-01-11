import { searchAxiosInstance } from "./axios";

export interface ISick {
  sickCd: string;
  sickNm: string;
}

interface ISickSearchManager {
  fetchSearchedSicks: (keyword: string) => Promise<Array<ISick> | null>;
}

class SickSearchManager implements ISickSearchManager {
  async fetchSearchedSicks(keyword: string) {
    let searchedSicks = null;
    try {
      const { data }: { data: Array<ISick> } = await searchAxiosInstance.get(
        `?q=${keyword}`,
      );
      searchedSicks = data;
    } catch (e) {
      // TODO: show toast
    }
    return searchedSicks;
  }
}

export const sickSearchManager = new SickSearchManager();
