import { toast } from "react-toastify";
import { BASE_URL, CacheError } from "./etc";

const CACHE_NAME = "sickCache";

export interface ISick {
  sickCd: string;
  sickNm: string;
}

interface ISickSearchManager {
  fetchSearchedSickList: (keyword: string) => Promise<Array<ISick> | null>;
}

class SickSearchManager implements ISickSearchManager {
  private sickCache: Cache | undefined;

  private requestURL = "";

  constructor() {
    this.makeCacheStorage();
  }

  private makeCacheStorage() {
    window.caches.open(CACHE_NAME).then((cache) => {
      this.sickCache = cache;
    });
  }

  async fetchSearchedSickList(keyword: string) {
    this.requestURL = `${BASE_URL}?q=${keyword}`;
    let searchedSicks = null;
    try {
      const cachedSickList = await this.findSearchedSickListInCacheStorage();
      if (!cachedSickList) {
        console.log("calling api");
        await this.saveSearchedSickListInCacheStorage();
        return await this.findSearchedSickListInCacheStorage();
      }
      searchedSicks = cachedSickList;
    } catch (e) {
      const { name } = e as Error;
      toast.error(name || "정보를 불러오는데 실패했습니다.");
    }
    return searchedSicks;
  }

  private async saveSearchedSickListInCacheStorage() {
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

  private async findSearchedSickListInCacheStorage() {
    const cachedResponse = await this.sickCache?.match(this.requestURL);
    if (cachedResponse) {
      const sickList = (await cachedResponse.json()) as Array<ISick>;
      return sickList;
    }
    return null;
  }
}

export const sickSearchManager = new SickSearchManager();
