import { getApiData, putApiData } from '@/actions';
import { AuthConfig } from '@/config';
import { TPage } from '@/types';
import { Container } from '@mui/material';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function ResultsPage({ params }: TPage) {
  const data = await getServerSession(AuthConfig);
  const attempt_id = params.attempt_id;

  const {
    data: { 0: currentAttempt },
  } = await getApiData({
    path: 'api/attempts',
    query: {
      filters: {
        id: attempt_id,
        student: { id: data?.user.id },
      },
      populate: ['session.test', 'question_variants.question', 'test.course'],
    },
    options: { next: { tags: ['session_attempt'] } },
  });

  if (!currentAttempt) {
    redirect(`/courses`);
  }

  if (!currentAttempt.closed) {
    await putApiData({
      path: `api/attempts/${currentAttempt.id}`,
      data: { closed: true },
    });
  }

  return <Container>results</Container>;
}
