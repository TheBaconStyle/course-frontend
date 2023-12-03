'use server';
import { AuthConfig } from '@/config';
import { getServerSession } from 'next-auth';
import { stringify } from 'qs';
export async function getAviableCourses() {
  const userData = await getServerSession(AuthConfig);

  const query = stringify({
    filters: {
      $or: [
        { groups: { students: { account: { id: userData?.user.id } } } },
        { teacher: { account: { id: userData?.user.id } } },
      ],
    },
    populate: 'image',
  });

  const coursesRes = await fetch(process.env.API_URL + `api/courses?${query}`, {
    method: 'GET',
    headers: {
      Authorization: `bearer ${process.env.API_KEY}`,
    },
    next: { revalidate: 5 },
  });

  const { data: courses } = await coursesRes.json();

  return courses;
}
