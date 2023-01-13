export const validKeywordRegex = /([^가-힣-A-z\x20])/i;

export const BASE_URL = "http://localhost:4000/sick";

export enum KeyDownOrder {
  DOWN_KEY = "ArrowDown",
  UP_KEY = "ArrowUp",
  DOWN_KEYCODE = 40,
  UP_KEYCODE = 38,
}

export enum CacheError {
  QUOTA_EXCEEDED = "QuotaExceededError",
  DOM = "DOMException",
}
