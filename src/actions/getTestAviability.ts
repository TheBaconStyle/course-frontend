'use server';

import { format } from 'date-fns';
import { stringify } from 'qs';
import { getServerSession } from 'next-auth';
import { AuthConfig } from '@/config';
import { getApiData } from '.';

type TGetTestAviabilityResult = {
  aviable: boolean;
  attempts: any[];
  session: any;
};

export async function getTestAviability(
  task_id: string,
): Promise<TGetTestAviabilityResult> {
  const result = { aviable: false, attempts: [], session: null };
  const userData = await getServerSession(AuthConfig);
  const user_id = userData?.user.id;

  if (!user_id) {
    return result;
  }

  const currentDate = new Date();
  const dateString = format(currentDate, 'yyyy-MM-dd');

  const {
    data: { 0: sessionData },
    meta: sessionMeta,
  } = await getApiData({
    path: 'api/sessions',
    query: {
      filters: {
        start: { $lte: dateString },
        finish: { $gt: dateString },
        test: { id: task_id },
        $or: [
          {
            students: { account: { id: user_id } },
          },
          { groups: { students: { account: { id: user_id } } } },
        ],
      },
    },
    options: { next: { tags: ['test_aviability_session'] } },
  });

  const isTaskAviable = sessionMeta.pagination.total === 1;

  if (isTaskAviable) {
    result.aviable = isTaskAviable;
    const { meta: attemptsMeta, data: attemptsData } = await getApiData({
      path: 'api/attempts',
      query: {
        filters: {
          student: { account: { id: userData?.user.id } },
          session: { id: sessionData.id },
        },
      },
      options: { next: { tags: ['test_aviability_attempts'] } },
    });
    result.session = sessionData;
    result.attempts = attemptsData;
  }

  return result;
}
