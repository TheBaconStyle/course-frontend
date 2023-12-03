'use server';
import { stringify } from 'qs';

export async function getTestByID(testId: string) {
  const query = stringify({ filters: { id: testId } }, { encode: false });
  const res = await fetch(process.env.API_URL + `api/tests?${query}`, {
    headers: { Authorization: `bearer ${process.env.API_KEY}` },
  });
  const { data } = await res.json();
  return data[0];
}
