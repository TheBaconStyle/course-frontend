'use server';

import { redirect } from 'next/navigation';
import { putApiData, revalidate } from '.';

export type CompleteAttemptOptions = {
  attempt: string;
};

export async function completeAttempt({ attempt }: CompleteAttemptOptions) {
  await putApiData({
    path: `api/attempts/${attempt}`,
    data: { completed: true },
  });
  revalidate(['session_attempt']);
}
