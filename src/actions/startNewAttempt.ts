'use server';
import { AuthConfig } from '@/config';
import { getServerSession } from 'next-auth';
import { getApiData } from '.';
import { add, format } from 'date-fns';
import { shuffle } from '@/functions';
import { postApiData } from './postApiData';

export type TStartNewAttemptOptions = {
  task_id: string;
};

export type TStartNewAttemptResult = {
  attempt: any;
  error: boolean;
  message: string;
};

export async function startNewAttempt({
  task_id,
}: TStartNewAttemptOptions): Promise<TStartNewAttemptResult> {
  const userData = await getServerSession(AuthConfig);
  const {
    data: { 0: studentData },
  } = await getApiData({
    path: 'api/students',
    query: {
      filters: { account: { id: userData?.user.id } },
    },
  });
  const currentDate = new Date();
  const dateString = format(currentDate, 'yyyy-MM-dd');
  const { data: sessionsData, meta: sessionsMeta } = await getApiData({
    path: 'api/sessions',
    query: {
      filters: {
        start: {
          $lte: dateString,
        },
        finish: {
          $gt: dateString,
        },
        test: {
          id: task_id,
        },
        $or: [
          { students: { account: { id: userData?.user.id } } },
          { groups: { students: { account: { id: userData?.user.id } } } },
        ],
      },
      populate: ['test', 'test.questions'],
    },
    options: { cache: 'no-store' },
  });

  if (sessionsMeta.pagination.total !== 1) {
    return {
      attempt: null,
      error: false,
      message: 'Нет доступа к прохождению тестирования',
    };
  }

  const currentSession = sessionsData[0];

  const currentTest = currentSession.test;

  if (currentTest.questions.length < currentSession.question_count) {
    return {
      attempt: null,
      error: true,
      message: 'Тест не готов',
    };
  }

  const { meta: attemptsMeta } = await getApiData({
    path: 'api/attempts',
    query: {
      filters: {
        student: { account: { id: userData?.user.id } },
        session: { id: currentSession.id },
      },
    },
    options: { cache: 'no-store' },
  });

  if (attemptsMeta.pagination.total >= currentSession.attempt_count) {
    return {
      attempt: null,
      error: false,
      message: 'Не осталось попыток',
    };
  }

  const attemptVariant = shuffle(currentTest.questions).slice(
    0,
    currentSession.question_count,
  );

  const variantQuestions: any[] = [];

  for (let index = 0; index < attemptVariant.length; index++) {
    const question = attemptVariant[index];
    const hasVariants = question.type !== 'fulltext';
    const shuffledVariants = hasVariants ? shuffle(question.variants) : null;
    const data = {
      question: question.id,
      variants: shuffledVariants,
      // sequence_index: index + 1,
    };

    const { data: sequenced_question } = await postApiData({
      path: 'api/question-variants',
      data,
    });

    variantQuestions.push(sequenced_question);
  }

  const attemptExpireTime = add(new Date(), {
    minutes: currentSession.complete_time,
  });

  const attemptExpiresString = attemptExpireTime.toISOString();

  const { data: currentAttempt } = await postApiData({
    path: 'api/attempts',
    data: {
      question_count: currentSession.question_count,
      pass: currentSession.pass,
      good: currentSession.good,
      excellent: currentSession.excellent,
      complete_time: currentSession.complete_time,
      expires_at: attemptExpiresString,
      question_variants: variantQuestions,
      session: currentSession.id,
      student: studentData.id,
    },
  });

  return {
    attempt: currentAttempt,
    error: false,
    message: 'Попытка успешно зарегистрирована',
  };
}
