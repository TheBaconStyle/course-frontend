import { getApiData } from '@/actions';
import { completeAttempt } from '@/actions/completeAttempt';
import { AuthConfig } from '@/config';
import { TPage } from '@/types';
import { ArrowLeft } from '@mui/icons-material';
import { Box, Button, Container, Divider, Typography } from '@mui/material';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
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
      populate: ['session.test.course', 'question_variants.question'],
    },
    options: { next: { tags: ['session_attempt'] } },
  });

  if (!currentAttempt) {
    redirect(`/courses`);
  }

  if (!currentAttempt.completed) {
    await completeAttempt({ attempt: currentAttempt.id });
  }

  const questionVariants = Array.from<any>(currentAttempt.question_variants);

  const rightAnswerCount = questionVariants.reduce((acc: number, variant) => {
    const questionType = variant.question.type;
    const isRankQuestion = questionType === 'rank';
    const isMultipleQuestion = questionType === 'multiple';
    const isSingleQuestion = questionType === 'single';
    const isFulltextQuestion = questionType === 'fulltext';

    let isRight = false;
    const userAnswer = variant.answer;
    const rightAnswer = variant.question.answer;

    if (isSingleQuestion || isFulltextQuestion) {
      isRight =
        String(userAnswer).toLowerCase() === String(rightAnswer).toLowerCase();
    }

    if (isRankQuestion || isMultipleQuestion) {
      const answers = Array.from<string>(userAnswer);
      const rightAnswers = Array.from<string>(rightAnswer);
      if (answers.length === rightAnswers.length) {
        if (isRankQuestion) {
          isRight = answers.every(
            (answer, index) => answer === rightAnswers[index],
          );
        }

        if (isMultipleQuestion) {
          isRight = answers.every((answer) => rightAnswers.includes(answer));
        }
      }
    }
    return isRight ? acc + 1 : acc;
  }, 0);

  const passMark = currentAttempt.session.pass;
  const goodMark = currentAttempt.session.good;
  const excellentMark = currentAttempt.session.excellent;

  const testId = currentAttempt.session.test.id;
  const courseId = currentAttempt.session.test.course.id;

  return (
    <Container>
      <Box>
        <Button
          LinkComponent={Link}
          href={`/courses/${testId}/tasks/${courseId}`}>
          <ArrowLeft /> Назад к тесту
        </Button>
      </Box>
      <Box sx={{ my: '1rem' }}>
        <Typography>
          Результат:&nbsp;
          {rightAnswerCount < passMark && 'неудовлетворительно'}
          {rightAnswerCount >= passMark &&
            rightAnswerCount < goodMark &&
            'удовлетворительно'}
          {rightAnswerCount >= goodMark &&
            rightAnswerCount < excellentMark &&
            'хорошо'}
          {rightAnswerCount >= excellentMark && 'отлично'}
        </Typography>
      </Box>
      <Divider />
    </Container>
  );
}
