/**
 * 文字列をキャメルケースに変換する
 * @param s - 変換対象の文字列
 * @returns キャメルケースに変換された文字列
 */
function toCamelCase(s: string): string {
  return s
    .split("_")
    .map((v, i) => {
      if (i === 0) {
        return v.toLowerCase();
      }
      return v.charAt(0).toUpperCase() + v.slice(1).toLowerCase();
    })
    .join("");
}

/**
 * オブジェクトのキーをキャメルケースに変換する
 * ネストされたオブジェクトや配列にも再帰的に対応
 * @param o - 変換対象のオブジェクト
 * @returns キーがキャメルケースに変換されたオブジェクト
 */
function toCamelCaseObject<T = unknown>(o: unknown): T {
  if (o === null || o === undefined) {
    return o as T;
  }

  if (Array.isArray(o)) {
    return o.map((item) => toCamelCaseObject(item)) as T;
  }

  if (typeof o === "object") {
    const result: Record<string, unknown> = {};
    Object.entries(o as Record<string, unknown>).forEach(([key, value]) => {
      const camelKey = toCamelCase(key);
      result[camelKey] =
        typeof value === "object" ? toCamelCaseObject(value) : value;
    });
    return result as T;
  }

  return o as T;
}

/**
 * 文字列をスネークケースに変換する
 * @param s - 変換対象の文字列
 * @returns スネークケースに変換された文字列
 */
function toSnakeCase(s: string): string {
  return s
    .split(/(?=[A-Z])/)
    .join("_")
    .toLowerCase();
}

/**
 * オブジェクトのキーをスネークケースに変換する
 * ネストされたオブジェクトや配列にも再帰的に対応
 * @param o - 変換対象のオブジェクト
 * @returns キーがスネークケースに変換されたオブジェクト
 */
function toSnakeCaseObject<T = unknown>(o: unknown): T {
  if (o === null || o === undefined) {
    return o as T;
  }

  if (Array.isArray(o)) {
    return o.map((item) => toSnakeCaseObject(item)) as T;
  }

  if (typeof o === "object") {
    const result: Record<string, unknown> = {};
    Object.entries(o as Record<string, unknown>).forEach(([key, value]) => {
      const snakeKey = toSnakeCase(key);
      result[snakeKey] =
        typeof value === "object" ? toSnakeCaseObject(value) : value;
    });
    return result as T;
  }

  return o as T;
}

export { toCamelCaseObject, toSnakeCaseObject };
