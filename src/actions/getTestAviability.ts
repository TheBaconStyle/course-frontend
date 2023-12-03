'use server';

import { format } from 'date-fns';
import { stringify } from 'qs';
import { getServerSession } from 'next-auth';
import { AuthConfig } from '@/config';

export async function getTestAviability(task_id: string) {
  const userData = await getServerSession(AuthConfig);
  const user_id = userData?.user.id;
  if (!user_id) {
    return false;
  }
  const currentDate = new Date();
  const dateString = format(currentDate, 'yyyy-MM-dd');
  const query = stringify(
    {
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
    { encode: false },
  );

  const res = await fetch(process.env.API_URL + `api/sessions?${query}`, {
    headers: { Authorization: `bearer ${process.env.API_KEY}` },
    cache: 'no-store',
  });

  const { meta } = await res.json();

  const isTaskAviable = meta.pagination.total === 1;

  return isTaskAviable;
}
