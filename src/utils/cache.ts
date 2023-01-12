import { BASE_URL } from "./axios";

const CACHE_NAME = "sickCache";

export interface ISick {
  sickCd: string;
  sickNm: string;
}

interface ISickSearchManager {
  fetchSearchedSickList: (keyword: string) => Promise<Array<ISick> | null>;
  saveSearchedSickListInCacheStorage: () => Promise<void>;
  findSearchedSickList: () => Promise<Array<ISick> | null>;
}

class SickSearchManager implements ISickSearchManager {
  sickCache: Cache | undefined;

  requestURL = "";

  constructor() {
    window.caches.open(CACHE_NAME).then((cache) => {
      this.sickCache = cache;
    });
  }

  async fetchSearchedSickList(keyword: string) {
    this.requestURL = `${BASE_URL}?q=${keyword}`;
    let searchedSicks = null;
    try {
      const cachedSickList = await this.findSearchedSickList();
      if (!cachedSickList) {
        this.saveSearchedSickListInCacheStorage();
        return await this.findSearchedSickList();
      }
      searchedSicks = cachedSickList;
    } catch (e) {
      // TODO: show toast
    }
    return searchedSicks;
  }

  async saveSearchedSickListInCacheStorage() {
    await this.sickCache?.add(this.requestURL);
  }

  async findSearchedSickList() {
    const cachedResponse = await this.sickCache?.match(this.requestURL);
    if (cachedResponse) {
      const sickList = (await cachedResponse.json()) as Array<ISick>;
      return sickList;
    }
    return null;
  }
}

export const sickSearchManager = new SickSearchManager();
