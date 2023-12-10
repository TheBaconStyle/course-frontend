'use server';

import { JSONObject } from '@/types';

export type PostApiDataOptions = {
  path: string;
  data: JSONObject;
};

export async function postApiData({ path, data }: PostApiDataOptions) {
  const apiKey = process.env.API_KEY;
  const apiUrl = process.env.API_URL;
  const body = new FormData();
  body.append('data', JSON.stringify(data));
  const res = await fetch(apiUrl + path, {
    cache: 'no-store',
    method: 'POST',
    credentials: 'omit',
    headers: {
      Accept: '*/*',
      ContentType: 'application/json',
      Authorization: `bearer ${apiKey}`,
    },
    body,
  });
  return await res.json();
}
