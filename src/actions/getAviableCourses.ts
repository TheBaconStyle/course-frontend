'use server';

import { AuthConfig } from '@/config';
import { getServerSession } from 'next-auth';

export async function getAviableCourses() {
  const data = await getServerSession(AuthConfig);

  const coursesRes = await fetch(process.env.API_URL + `api/courses/aviable`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${data?.user.jwt}`,
    },
    next: { revalidate: 5 },
  });

  return await coursesRes.json();
}
