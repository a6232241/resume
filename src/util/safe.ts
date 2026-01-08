/**
 * 定義標準的 Result 結構
 */
export type Result<T, E = Error> = { data: T; error: null } | { data: null; error: E };

/**
 * 萬用的非同步錯誤處理封裝
 * @param promise 一個 Promise 物件
 * @returns 回傳一個包含 { data, error } 的物件
 */
export async function safe<T, E = Error>(promise: Promise<T>): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    // 這裡可以統一做全域日誌記錄，例如 Sentry 或 console.error
    console.error("[Safe Wrapper Error]:", error);
    return { data: null, error: error as E };
  }
}
