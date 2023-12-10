'use server';
import { stringify } from 'qs';

export type GetApiDataOptions = {
  path: string;
  query?: any;
  options?: RequestInit;
};

export async function getApiData({ query, path, options }: GetApiDataOptions) {
  const requestQuery = stringify(query, { encode: false });
  const apiKey = process.env.API_KEY;
  const apiUrl = process.env.API_URL;
  const res = await fetch(apiUrl + path + `?${requestQuery}`, {
    ...options,
    headers: {
      Authorization: `bearer ${apiKey}`,
      ...options?.headers,
    },
  });
  return await res.json();
}
