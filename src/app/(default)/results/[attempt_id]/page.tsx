import { getApiData } from '@/actions';
import { completeAttempt } from '@/actions/completeAttempt';
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

  if (!currentAttempt.completed) {
    await completeAttempt({ attempt: currentAttempt.id });
  }

  const questionVariants = currentAttempt.question_variants;

  if (Array.isArray(questionVariants)) {
    const rightVariants = questionVariants.reduce((acc: number, variant) => {
      const questionType = variant.question.type;
      const isSimpleQuestion = questionType === 'rank';
      const isMultipleQuestion = questionType === 'multiple';
      const isSingleQuestion = questionType === 'single';
      const isFulltextQuestion = questionType === 'fulltext';
    }, 0);
  }

  return (
    <Container>
      <>{JSON.stringify(currentAttempt)}</>
      {}
    </Container>
  );
}
