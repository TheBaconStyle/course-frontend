'use server';
import { stringify } from 'qs';

export async function getCurrentTasks(userId: string) {
  const query = stringify({ filters: {} });
  const res = await fetch(process.env.API_URL + `api/sessions?${query}`);
}
