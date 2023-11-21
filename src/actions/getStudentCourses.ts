'use server';

export async function getStudentCourses({ student }) {
  const courseRes = await fetch(process.env.API_URL + `api/courses/student`, {
    method: 'GET',
  });
}
