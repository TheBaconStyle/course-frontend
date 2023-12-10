import { getApiData } from '@/actions';
import {
  FullTextQuestion,
  MultipleQuestion,
  SingleQuestion,
  TaskTimer,
} from '@/components';
import { QuestionPagination } from '@/components/QuestionPagination';
import { RankQuestion } from '@/components/RankQuestion';
import { AuthConfig } from '@/config';
import { TPage } from '@/types';
import { Container, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AttemptPage({ params, searchParams }: TPage) {
  const data = await getServerSession(AuthConfig);
  const attempt_id = params.attempt_id;
  const question_index = Number(searchParams.question ?? 1);

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

  const currentMoment = new Date();
  const expireDate = new Date(currentAttempt.expires_at);
  const questions = currentAttempt.question_variants;
  const current_task = questions[question_index - 1];

  if (currentMoment > expireDate || currentAttempt.closed) {
    redirect(`/results/${attempt_id}`);
  }

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Typography variant="h6">
        Тест по теме: {currentAttempt.session.test.theme}
      </Typography>
      <TaskTimer to={expireDate} from={currentMoment} />
      <QuestionPagination
        current_question={question_index}
        question_count={currentAttempt.session.test.question_count}
      />

      {current_task.question.type === 'fulltext' && (
        <FullTextQuestion questionVariant={current_task} />
      )}

      {current_task.question.type === 'single' && (
        <SingleQuestion questionVariant={current_task} />
      )}

      {current_task.question.type === 'multiple' && (
        <MultipleQuestion questionVariant={current_task} />
      )}

      {current_task.question.type === 'rank' && (
        <RankQuestion questionVariant={current_task} />
      )}
    </Container>
  );
}
