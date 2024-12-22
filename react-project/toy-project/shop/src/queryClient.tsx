import { QueryClient } from "react-query";
import request, { RequestDocument } from "graphql-request";

type AnyOBJ = { [key: string]: any };
// const BASE_URL = "https://fakestoreapi.com";
const BASE_URL = "/";

// Create a client
export const getClient = (() => {
  let client: QueryClient | null = null;
  return () => {
    if (!client)
      client = new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: 1000 * 60 * 60 * 24,
            staleTime: 1000 * 60,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
          },
        },
      });
    return client;
  };
})();

export const restFetcher = async ({
  method,
  path,
  body,
  params,
}: {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  body?: AnyOBJ;
  params?: AnyOBJ;
}) => {
  try {
    let url = `${BASE_URL}${path}`;

    const fetchOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": BASE_URL,
      },
    };

    if (params) {
      const searchParams = new URLSearchParams(params);
      url += "?" + searchParams.toString();
    }

    if (body) fetchOptions.body = JSON.stringify(body);

    const res = await fetch(url, fetchOptions);

    // 응답 상태 확인
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Error in Fetcher:", err);
    throw err; // 에러를 던져 호출자에게 알림
  }
};

export const graphqlFetcher = (query: RequestDocument, variables = {}) =>
  request(BASE_URL, query, variables);

export const QueryKeys = {
  PRODUCTS: "PRODUCTS",
  CART: "CART",
};
