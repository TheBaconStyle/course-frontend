'use server';
import { stringify } from 'qs';

export async function getCourseTests(course_id: string) {
  const query = stringify(
    {
      filters: { course: { id: course_id } },
      fields: ['id', 'theme'],
    },
    { encode: false },
  );

  const res = await fetch(process.env.API_URL + `api/tests?${query}`, {
    headers: { Authorization: `bearer ${process.env.API_KEY}` },
    next: { revalidate: 5 },
  });

  const { data } = await res.json();

  return data as any[];
}
