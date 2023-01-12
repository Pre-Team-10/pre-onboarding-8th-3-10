import { toast } from "react-toastify";
import { BASE_URL } from "./axios";

const CACHE_NAME = "sickCache";

export interface ISick {
  sickCd: string;
  sickNm: string;
}

enum CacheError {
  QUOTA_EXCEEDED = "QuotaExceededError",
  DOM = "DOMException",
}

interface ISickSearchManager {
  fetchSearchedSickList: (keyword: string) => Promise<Array<ISick> | null>;
  saveSearchedSickListInCacheStorage: () => Promise<void>;
  findSearchedSickList: () => Promise<Array<ISick> | null>;
  makeCacheStorage: () => void;
}

class SickSearchManager implements ISickSearchManager {
  sickCache: Cache | undefined;

  requestURL = "";

  constructor() {
    this.makeCacheStorage();
  }

  makeCacheStorage() {
    window.caches.open(CACHE_NAME).then((cache) => {
      this.sickCache = cache;
    });
  }

  async fetchSearchedSickList(keyword: string) {
    this.requestURL = `${BASE_URL}?q=${keyword}`;
    let searchedSicks = null;
    console.log("calling api");
    try {
      const cachedSickList = await this.findSearchedSickList();
      if (!cachedSickList) {
        await this.saveSearchedSickListInCacheStorage();
        return await this.findSearchedSickList();
      }
      searchedSicks = cachedSickList;
    } catch (e) {
      const { name } = e as Error;
      toast.error(name || "정보를 불러오는데 실패했습니다.");
    }
    return searchedSicks;
  }

  async saveSearchedSickListInCacheStorage() {
    try {
      await this.sickCache?.add(this.requestURL);
    } catch (e) {
      const { name: errorName } = e as Error;
      if (
        errorName === CacheError.QUOTA_EXCEEDED ||
        errorName === CacheError.DOM
      ) {
        await this.sickCache?.delete(CACHE_NAME);
        this.makeCacheStorage();
      }
    }
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
