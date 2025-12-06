import type { Payment } from "@/types/payment";
import type { Result } from "@/types/result";
import { toCamelCaseObject, toSnakeCaseObject } from "./caseConvert";

interface FetchResultParams {
  algorithmId: number;
  payments: Payment[];
  eventId: string;
}

/**
 * バックエンドAPIに計算リクエストを送信し、結果を取得する
 * @param params - algorithmIdとpaymentsを含むパラメータ
 * @returns 計算結果の配列
 * @throws APIエンドポイントが未定義の場合、またはAPIリクエストが失敗した場合にエラーをスロー
 */
async function fetchResult(params: FetchResultParams): Promise<Result[]> {
  const apiEndpoint = import.meta.env.VITE_API_ENDPOINT;

  if (!apiEndpoint) {
    throw new Error(
      "VITE_API_ENDPOINT is not defined in environment variables. Please check your .env file.",
    );
  }

  const url = `${apiEndpoint}/api/v1/calculate/`;

  // リクエストボディをsnake_caseに変換
  // API仕様に従って、algorithm_idとpaymentsとevent_idを送信
  const requestBody = toSnakeCaseObject({
    algorithmId: params.algorithmId,
    payments: params.payments,
    eventId: params.eventId,
  });

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      // エラーレスポンスの詳細を取得
      const errorMessage = `API request failed: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    const data = await response.json();

    // レスポンスが配列であることを確認
    if (!Array.isArray(data)) {
      throw new Error("Invalid response format: expected an array");
    }

    // バックエンドからのレスポンス(snake_case)をcamelCaseに変換
    const results = data.map((item) => {
      const converted = toCamelCaseObject<Result>(item);

      // 必須フィールドの存在確認
      if (
        typeof converted.id !== "number" ||
        typeof converted.amount !== "number" ||
        typeof converted.paidBy !== "number" ||
        typeof converted.paidFor !== "number"
      ) {
        throw new Error("Invalid response format: missing required fields");
      }

      return converted;
    });

    return results;
  } catch (error) {
    // ネットワークエラーなどのキャッチ
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("An unexpected error occurred while fetching results");
  }
}

export { fetchResult };
export type { FetchResultParams };
